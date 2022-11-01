import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import type {
  Settings,
  Controller,
  FeeController,
  Deployer,
  Bridge,
  BridgePool,
  Registry,
  BridgeSocket,
  Token,
  WrappedToken
} from "../typechain-types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { describe } from "mocha";
import { parseEther } from "ethers/lib/utils";

describe("BridgePool", () => {
  let deployer: Deployer;
  let controller: Controller;
  let owner: SignerWithAddress;
  let admin: SignerWithAddress;
  let randomAddress: SignerWithAddress;
  let assetOwner: SignerWithAddress;
  let recoveryAdmin: SignerWithAddress;
  let lossLess: SignerWithAddress;
  let feeRemittance: SignerWithAddress;
  let bridge: Bridge;
  let settings: Settings;
  let pool: BridgePool;
  let registry: Registry;
  let feeController: FeeController;
  let assetManager: SignerWithAddress;
  let assetToken: Token;
  let brdg: Token;
  let pendingBridge: SignerWithAddress;
  let wrappedAsset:WrappedToken

  beforeEach(async () => {
    [
      feeRemittance,
      owner,
      admin,
      recoveryAdmin,
      randomAddress,
      lossLess,
      assetOwner,
      pendingBridge,
      assetManager,
    ] = await ethers.getSigners();
    const BridgeToken = await ethers.getContractFactory("Token");
    brdg = await BridgeToken.connect(owner).deploy("Bridge NetWork", "brdg");
    const controllerContract = await ethers.getContractFactory("Controller");
    controller = await controllerContract.connect(owner).deploy();
    await controller.connect(owner).addAdmin(admin.address, true);
    const DeployerContract = await ethers.getContractFactory("Deployer");
    deployer = await DeployerContract.connect(owner).deploy(controller.address);
    const registryContract = await ethers.getContractFactory("Registry");
    registry = await registryContract.connect(owner).deploy();

    const SettingContract = await ethers.getContractFactory("Settings");
    settings = await SettingContract.connect(owner).deploy(
      controller.address,
      feeRemittance.address
    );
    const feeControllerContract = await ethers.getContractFactory(
      "FeeController"
    );
    feeController = await feeControllerContract
      .connect(owner)
      .deploy(controller.address, settings.address);
    const bridgePool = await ethers.getContractFactory("BridgePool");
    pool = await bridgePool.connect(owner).deploy(controller.address);
    const Bridge = await ethers.getContractFactory("Bridge");
    bridge = await Bridge.connect(owner).deploy(
      controller.address,
      settings.address,
      registry.address,
      deployer.address,
      feeController.address,
      pool.address,
      ethers.constants.AddressZero
    );
    await registry.connect(owner).transferOwnership(bridge.address);
    const TestToken = await ethers.getContractFactory("Token");
    assetToken = await TestToken.connect(assetOwner).deploy(
      "Asset_One",
      "Ass1"
    );
  });

  describe("Constructor", () => {
    it("The constructor should be right", async () => {
      expect(await pool.controller()).to.be.equal(controller.address);
    });
  });

  describe("Initialize pool", () => {
    it("Should initialize the pool", async () => {
      await pool.connect(owner).initializePool(bridge.address);
      expect(await pool.bridge()).to.be.equal(bridge.address);
      expect(await pool.initialized()).to.be.true;
    });

    it("Should revert if random Address tries to initialize the pool", async () => {
      await expect(
        pool.connect(randomAddress).initializePool(bridge.address)
      ).to.be.revertedWith("U_A");
    });
  });

  describe("Initialize pool Update", () => {
    beforeEach(async () => {
      await pool.connect(owner).initializePool(bridge.address);
    });

    it("Should initialize the pool update", async () => {
      const tx = await pool
        .connect(owner)
        .innitiateBridgeUpdate(pendingBridge.address);
      expect(tx)
        .emit(pool, "NewBridgeInnitiated")
        .withArgs(bridge.address, pendingBridge.address);
      expect(await pool.pendingBridge()).to.be.equal(pendingBridge.address);
      expect(await pool.bridgeUpdateInnitiatedAt()).to.be.equal(
        await time.latest()
      );
    });

    it("Should revert if there is a pending bridge", async () => {
      await pool.connect(owner).innitiateBridgeUpdate(pendingBridge.address);
      await expect(
        pool.connect(owner).innitiateBridgeUpdate(pendingBridge.address)
      ).to.be.revertedWith("pending Bridge already innitiated");
    });

    it("Should revert if random address tries to initialize bridge update", async () => {
      await expect(
        pool.connect(randomAddress).innitiateBridgeUpdate(pendingBridge.address)
      ).to.be.revertedWith("U_A");
    });
  });

  describe("suspendBridgeUpdate", () => {
    beforeEach(async () => {
      await pool.connect(owner).initializePool(bridge.address);
    });
    it("Should revert if there is no pending bridge update", async () => {
      await expect(
        pool.connect(owner).suspendBridgeUpdate()
      ).to.be.revertedWith("new bridge not innitiated");
    });

    it("Should suspend the new bridge update", async () => {
      await pool.connect(owner).innitiateBridgeUpdate(pendingBridge.address);
      await pool.connect(owner).suspendBridgeUpdate();
      expect(await pool.pendingBridge()).to.be.equal(
        ethers.constants.AddressZero
      );
    });
  });

  describe("activateNewBridge", () => {
    beforeEach(async () => {
      await pool.connect(owner).initializePool(bridge.address);
    });

    it("Should revert if there is no pending bridge update", async () => {
      await expect(pool.connect(owner).activateNewBridge()).to.be.revertedWith(
        "new bridge not innitiated"
      );
    });

    it("Should activate the new bridge update", async () => {
      await pool.connect(owner).innitiateBridgeUpdate(pendingBridge.address);
      await time.increase(86401);
      const tx = await pool.connect(owner).activateNewBridge();
      expect(await pool.bridge()).to.be.equal(pendingBridge.address);
      expect(tx)
        .emit(pool, "NewBridgeActivated")
        .withArgs(bridge.address, pendingBridge.address);
    });

    it("Should revert if not more than one after initialization of the new bridge update", async () => {
      await pool.connect(owner).innitiateBridgeUpdate(pendingBridge.address);
      await expect(pool.connect(owner).activateNewBridge()).to.be.revertedWith(
        "update delay active"
      );
    });
  });

  describe("Create pool", () => {
    beforeEach(async () => {
      await pool.connect(owner).initializePool(bridge.address);
      await settings
        .connect(owner)
        .setNetworkSupportedChains(
          [1, 2, 9],
          [parseEther("0.01"), parseEther("0.01"), parseEther("0.01")],
          true
        );

      await brdg
        .connect(owner)
        .transfer(assetOwner.address, await settings.railRegistrationFee());
      await brdg
        .connect(assetOwner)
        .approve(bridge.address, await settings.railRegistrationFee());
      await settings.connect(owner).setbrgToken(brdg.address);
    });

    it("Should revert if called by an unauthorized address", async () => {
      await expect(
        pool
          .connect(randomAddress)
          .createPool(assetToken.address, parseEther("100"))
      ).to.be.revertedWith("Only Authurized Callable");
    });

    it("Should revert if debit threshold is less than zero", async () => {
      await expect(
        bridge
          .connect(assetOwner)
          .registerRail(
            assetToken.address,
            parseEther("0.01"),
            0,
            [2],
            [ethers.constants.AddressZero],
            true,
            assetManager.address,
            assetManager.address,
            0
          )
      ).to.be.revertedWith("cant be zero");

      await expect(
        pool.connect(owner).createPool(assetToken.address, 0)
      ).to.be.revertedWith("cant be zero");
    });

    it("Should create a pool successfully", async () => {
      const tx = await pool
        .connect(owner)
        .createPool(assetToken.address, parseEther("100"));
      expect(await pool.poolCount()).to.be.equal(1);
      expect(tx)
        .to.emit(pool, "PoolCreated")
        .withArgs(
          assetToken.address,
          (await pool.pools(assetToken.address)).wrappedAsset
        );
    });
  });

  describe("deposit", () => {
    it("Should revert if pool is not initialized", async () => {
      await expect(
        pool.connect(assetOwner).deposit(assetToken.address, parseEther("10"))
      ).to.be.revertedWith("pool not initialized");
    });

    it("Should revert if pool has not being created", async () => {
      await pool.connect(owner).initializePool(bridge.address);
      await expect(
        pool.connect(assetOwner).deposit(assetToken.address, parseEther("10"))
      ).to.be.revertedWith("invalid Pool");
    });

    it("Should deposit successfully", async () => {
      await pool.connect(owner).initializePool(bridge.address);
      await assetToken.connect(assetOwner).approve(pool.address,ethers.constants.MaxUint256)
      await pool
        .connect(owner)
        .createPool(assetToken.address, parseEther("100"));
      const tx = await pool
        .connect(assetOwner)
        .deposit(assetToken.address, parseEther("1"));
      //console.log((await pool.pools(assetToken.address)).deposited)
      expect(tx)
        .to.emit(pool, "AssetDeposited")
        .withArgs(
          assetToken.address,
          (await pool.pools(assetToken.address)).deposited
        );
    });
  });

  describe("withdraw",() => {
    it("Should revert if pool is not initialized", async () => {
      await expect(
        pool.connect(assetOwner).withdraw(assetToken.address, parseEther("10"))
      ).to.be.revertedWith("pool not initialized");
    });

    it("Should revert if pool has not being created", async () => {
      await pool.connect(owner).initializePool(bridge.address);
      await expect(
        pool.connect(assetOwner).withdraw(assetToken.address, parseEther("10"))
      ).to.be.revertedWith("invalid Pool");
    });

    it("Should withdraw successfully", async () => {
      await pool.connect(owner).initializePool(bridge.address);
      await assetToken.connect(assetOwner).approve(pool.address,ethers.constants.MaxUint256)
      await pool
        .connect(owner)
        .createPool(assetToken.address, parseEther("100"));
      await pool
        .connect(assetOwner)
        .deposit(assetToken.address, parseEther("1"));
      const wrappedAddress =  (await pool.pools(assetToken.address)).wrappedAsset
      wrappedAsset = await ethers.getContractAt("WrappedToken",wrappedAddress)
      await wrappedAsset.connect(assetOwner).approve(pool.address, ethers.constants.MaxUint256)
      const tx = await pool.connect(assetOwner).withdraw(assetToken.address, parseEther("1"))
      expect(tx)
        .to.emit(pool, "AssetWithdrawn")
        .withArgs(
          assetToken.address,
          assetOwner.address,
          parseEther("1")
        );
    });

  })
});
