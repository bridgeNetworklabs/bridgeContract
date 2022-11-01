import { ethers } from "hardhat";
import type {
  Controller,
  Deployer,
  Settings,
  FeeController,
  Registry,
  Bridge,
  BridgeSocket,
  Token,
  BridgePool,
} from "../typechain-types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther, parseUnits } from "ethers/lib/utils";

describe("Bridge", function () {
  let controller: Controller;
  let deployer: Deployer;
  let settings: Settings;
  let feeController: FeeController;
  let registry: Registry;
  let bridge: Bridge;
  let socket: BridgeSocket;
  let pool: BridgePool;
  let brgToken: Token;
  let assetToken: Token;
  let feeRemittance: SignerWithAddress;
  let Admin: SignerWithAddress;
  let assetFeeRemittance: SignerWithAddress;
  let assetManager: SignerWithAddress;
  let assetAdmin: SignerWithAddress;
  let notManagerOrAdmin: SignerWithAddress;
  let notManagerOrAdminOrAdminOrApproved: SignerWithAddress;
  let validator1: SignerWithAddress;
  let validator2: SignerWithAddress;
  let validator3: SignerWithAddress;
  let validator4: SignerWithAddress;
  let validator5: SignerWithAddress;
  let oracle: SignerWithAddress;
  let registrar: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  const zeroAddress = ethers.constants.AddressZero;

  beforeEach(async () => {
    [
      Admin,
      feeRemittance,
      assetAdmin,
      assetFeeRemittance,
      assetManager,
      notManagerOrAdmin,
      notManagerOrAdminOrAdminOrApproved,
      validator1,
      validator2,
      validator3,
      validator4,
      validator5,
      oracle,
      registrar,
      user1,
      user2,
    ] = await ethers.getSigners();

    const controllerContract = await ethers.getContractFactory("Controller");
    controller = await controllerContract.deploy();
    await controller.connect(Admin).addRegistrar(registrar.address, true);
    await controller.connect(Admin).addOracle(oracle.address, true);
    await controller.connect(Admin).addValidator(validator1.address, true);
    await controller.connect(Admin).addValidator(validator2.address, true);
    await controller.connect(Admin).addValidator(validator3.address, true);
    await controller.connect(Admin).addValidator(validator4.address, true);
    await controller.connect(Admin).addValidator(validator5.address, true);

    const deployerContract = await ethers.getContractFactory("Deployer");
    deployer = await deployerContract.deploy(controller.address);

    const SettingContract = await ethers.getContractFactory("Settings");
    settings = await SettingContract.deploy(
      controller.address,
      feeRemittance.address
    );

    const feeControllerContract = await ethers.getContractFactory(
      "FeeController"
    );
    feeController = await feeControllerContract.deploy(
      controller.address,
      settings.address
    );

    const registryContract = await ethers.getContractFactory("Registry");
    registry = await registryContract.deploy();

    const bridgePool = await ethers.getContractFactory("BridgePool");
    pool = await bridgePool.deploy(controller.address);

    const Bridge = await ethers.getContractFactory("Bridge");
    bridge = await Bridge.deploy(
      controller.address,
      settings.address,
      registry.address,
      deployer.address,
      feeController.address,
      pool.address,
      ethers.constants.AddressZero
    );

    const BridgeToken = await ethers.getContractFactory("Token");
    brgToken = await BridgeToken.deploy("Bridge Token", "Brdg");

    const TestToken = await ethers.getContractFactory("Token");
    assetToken = await TestToken.connect(assetAdmin).deploy(
      "Asset_One",
      "Ass1"
    );

    await registry.transferOwnership(bridge.address);
    await settings.setbrgToken(brgToken.address);
    await deployer.updateBridge(bridge.address);
    await pool.initializePool(bridge.address);
  });

  describe("Deployment", () => {
    it("All Bridge Contract should be correct", async () => {
      expect(await bridge.controller()).to.be.equal(controller.address);
      expect(await bridge.registry()).to.be.equal(registry.address);
      expect(await bridge.settings()).to.be.equal(settings.address);
      expect(await bridge.feeController()).to.be.equal(feeController.address);
      expect(await bridge.bridgePool()).to.be.equal(pool.address);
      expect(await bridge.deployer()).to.be.equal(deployer.address);
    });
  });

  describe("Registering Rail", () => {
    it("should be able register Rail by Admin", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);

      await bridge
        .connect(Admin)
        .registerRail(
          ethers.constants.AddressZero,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [ethers.constants.AddressZero],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );
      let asset = await bridge.nativeAssets(ethers.constants.AddressZero);
      expect(asset[9]).to.be.true;
    });

    it("should be able register Rail by Asset Admin", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetAdmin.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetAdmin)
        .approve(bridge.address, settings.railRegistrationFee());
      await bridge
        .connect(assetAdmin)
        .registerRail(
          assetToken.address,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [ethers.constants.AddressZero],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );
      let asset = await bridge.nativeAssets(assetToken.address);
      await expect(asset[9]).to.be.true;
    });
    it("should be able register Rail by User Approved Add", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());

      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, assetToken.address, true);

      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken.address,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [ethers.constants.AddressZero],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );
      let asset = await bridge.nativeAssets(assetToken.address);

      expect(asset[9]).to.be.true;
    });

    it("should not be able register Rail by User who is not Admin/Admin/Approved", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(
          notManagerOrAdminOrAdminOrApproved.address,
          settings.railRegistrationFee()
        );
      await brgToken
        .connect(notManagerOrAdminOrAdminOrApproved)
        .approve(bridge.address, settings.railRegistrationFee());

      await expect(
        bridge
          .connect(notManagerOrAdminOrAdminOrApproved)
          .registerRail(
            assetToken.address,
            "100000000000000000000",
            "10000000000000000000000",
            [2],
            [ethers.constants.AddressZero],
            false,
            assetFeeRemittance.address,
            assetManager.address,
            2
          )
      ).to.be.revertedWith("U_A");
    });
  });

  describe("Updating Rail", () => {
    it("should allow manager update asset", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());

      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, assetToken.address, true);

      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken.address,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [ethers.constants.AddressZero],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      expect(
        await bridge
          .connect(assetManager)
          .updateAsset(
            assetToken.address,
            assetManager.address,
            assetManager.address,
            "100000000000000000000",
            "10000000000000000000000"
          )
      ).to.not.throw;
    });
    it("should be able to update asset", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());

      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, assetToken.address, true);

      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken.address,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [ethers.constants.AddressZero],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      await bridge
        .connect(assetManager)
        .updateAsset(
          assetToken.address,
          assetManager.address,
          assetManager.address,
          "1000000000000000000000",
          "10000000000000000000000"
        );

      const asset = await bridge
        .connect(assetManager)
        .nativeAssets(assetToken.address);
      await expect(asset[1]).to.equal("1000000000000000000000");
    });
    it("should allow Admin update asset", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());

      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, assetToken.address, true);

      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken.address,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [ethers.constants.AddressZero],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      expect(
        await bridge
          .connect(Admin)
          .updateAsset(
            assetToken.address,
            assetManager.address,
            assetManager.address,
            "100000000000000000000",
            "10000000000000000000000"
          )
      ).to.not.throw;
    });

    it("should not allow none manager/Admin update asset", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());

      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, assetToken.address, true);

      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken.address,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [ethers.constants.AddressZero],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      await expect(
        bridge
          .connect(notManagerOrAdmin)
          .updateAsset(
            assetToken.address,
            assetManager.address,
            assetManager.address,
            "100000000000000000000",
            "10000000000000000000000"
          )
      ).to.revertedWith("U_A");
    });
  });

  describe("Transaction", () => {
    it("should not be able Bridge assetToken without approval asset/Fees ", async function () {
      await settings
        .connect(Admin)
        .setNetworkSupportedChains([2], ["10000000000000000000"], true);
      await brgToken
        .connect(Admin)
        .transfer(assetAdmin.address, settings.railRegistrationFee());

      await brgToken
        .connect(assetAdmin)
        .approve(bridge.address, ethers.constants.MaxUint256);

      await bridge
        .connect(assetAdmin)
        .registerRail(
          assetToken.address,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [zeroAddress],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      await bridge.connect(Admin).activeNativeAsset(assetToken.address, true);

      await expect(
        bridge
          .connect(assetAdmin)
          .send(2, assetToken.address, "100000000000000000000", Admin.address)
      ).to.revertedWith("I_F");
    });
    it("should  be able to Bridge coin", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [0], true);
      await brgToken
        .connect(Admin)
        .approve(bridge.address, settings.railRegistrationFee());

      await bridge
        .connect(Admin)
        .registerRail(
          zeroAddress,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          ["0xbf07d7C2613188E3b403D9fbdca7872D0ff1e5aF"],
          true,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      // let fees = await ethers.utils.parseEther(val)
      await bridge.connect(Admin).activeNativeAsset(zeroAddress, true);
      // await assetToken.connect(Admin).approve(bridge.address, "1000000000000000000000")
      let transactionID = await registry.getID(
        bridge.chainId(),
        2,
        zeroAddress,
        "100000000000000000000",
        Admin.address,
        registry.getUserNonce(Admin.address)
      );
      await bridge
        .connect(Admin)
        .send(2, zeroAddress, "100000000000000000000", Admin.address, {
          value: "100000000000000000000",
        });
      expect(await registry.isSendTransaction(transactionID)).to.be.true;
    });

    it("should  be able Bridge assetToken", async function () {
      await settings
        .connect(Admin)
        .setNetworkSupportedChains([2], ["10000000000000000000"], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());
      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, assetToken.address, true);
      // await settings.connect(Admin).enableBaseFee()

      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken.address,
          ethers.utils.parseEther("0.001"),
          ethers.utils.parseEther("1000"),
          [2],
          [zeroAddress],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      // let fees = await ethers.utils.parseEther(val)
      await bridge.connect(Admin).activeNativeAsset(assetToken.address, true);
      await assetToken
        .connect(assetAdmin)
        .transfer(user1.address, ethers.utils.parseEther("10"));
      await assetToken
        .connect(user1)
        .approve(bridge.address, ethers.utils.parseEther("1"));
      let val = await feeController.getBridgeFee(
        user1.address,
        assetToken.address,
        2
      );
      let transactionID = await registry.getID(
        bridge.chainId(),
        2,
        assetToken.address,
        ethers.utils.parseEther("0.01"),
        user2.address,
        registry.getUserNonce(user1.address)
      );

      await bridge
        .connect(user1)
        .send(
          2,
          assetToken.address,
          ethers.utils.parseEther("0.01"),
          user2.address,
          {
            value: val,
          }
        );

      expect(await registry.isSendTransaction(transactionID)).to.be.true;
    });

    it("Should be able Bridge assetToken With any decimals", async function () {
      const assetTokenContract2 = await ethers.getContractFactory("TestToken");

      const token = await assetTokenContract2
        .connect(assetAdmin)
        .deploy("Token", "tkn", 6);
      await settings
        .connect(Admin)
        .setNetworkSupportedChains([2], ["10000000000000000000"], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());
      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, token.address, true);
      // await settings.connect(Admin).enableBaseFee()

      await bridge
        .connect(assetManager)
        .registerRail(
          token.address,
          ethers.utils.parseUnits("0.001", 6),
          ethers.utils.parseUnits("1000", 6),
          [2],
          [zeroAddress],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      // let fees = await ethers.utils.parseEther(val)
      await bridge.connect(Admin).activeNativeAsset(token.address, true);
      await token
        .connect(assetAdmin)
        .transfer(user1.address, ethers.utils.parseUnits("10", 6));
      await token
        .connect(user1)
        .approve(bridge.address, ethers.utils.parseUnits("1", 6));
      let val = await feeController.getBridgeFee(
        user1.address,
        token.address,
        2
      );
      let transactionID = await registry.getID(
        bridge.chainId(),
        2,
        token.address,
        ethers.utils.parseUnits("1", 16), // to get the correct transaction you have to standardizes the token
        user2.address,
        registry.getUserNonce(user1.address)
      );

      await bridge
        .connect(user1)
        .send(
          2,
          token.address,
          ethers.utils.parseUnits("0.01", 6),
          user2.address,
          {
            value: val,
          }
        );

      expect(await registry.isSendTransaction(transactionID)).to.be.true;
    });
    it("should  be able validate DirectSwap assetToken With any decimals", async function () {
      await settings
        .connect(Admin)
        .setNetworkSupportedChains([2], ["10000000000000000000"], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());
      const assetTokenContract = await ethers.getContractFactory("TestToken");
      const assetToken2 = await assetTokenContract.deploy("Token", "tkn", 6);
      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, assetToken2.address, true);
      await settings.connect(Admin).enableBaseFee();

      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken2.address,
          "1000000",
          "1000000000000",
          [2],
          ["0x55d398326f99059fF775485246999027B3197955"],
          true,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      await bridge
        .connect(Admin)
        .addForiegnAsset(
          "0x55d398326f99059fF775485246999027B3197955",
          2,
          ["1000000", "1000000"],
          ["w", "w"],
          true,
          assetManager.address,
          assetFeeRemittance.address,
          3,
          true,
          assetToken2.address
        );
      // let fees = await ethers.utils.parseEther(val)
      await bridge.connect(Admin).activeNativeAsset(assetToken2.address, true);
      await assetToken2.connect(Admin).approve(bridge.address, "1000000000");
      let val = await feeController.getBridgeFee(
        Admin.address,
        assetToken2.address,
        2
      );

      await bridge
        .connect(Admin)
        .send(2, assetToken2.address, "1000000000", Admin.address, {
          value: val,
        });

      let mintID = await registry.getID(
        2,
        bridge.chainId(),
        "0x55d398326f99059fF775485246999027B3197955",
        "100000000000000000000",
        assetManager.address,
        0
      );
      await registry
        .connect(oracle)
        .registerMintTransaction(
          mintID,
          2,
          "0x55d398326f99059fF775485246999027B3197955",
          "100000000000000000000",
          assetManager.address,
          0
        );

      let transaction = await registry.mintTransactions(mintID);

      let signatures = [];
      let id = await bridge.chainId();
      let message = await registry.getID(
        id.toString(),
        transaction[0],
        transaction[1],
        transaction[2],
        transaction[3],
        transaction[4]
      );
      signatures[0] = await validator1.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[1] = await validator2.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[2] = await validator3.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[3] = await validator4.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[4] = await validator5.signMessage(
        await ethers.utils.arrayify(message)
      );

      await registry
        .connect(validator3)
        .validateTransaction(mintID, signatures, true);

      let balance = await assetToken2.balanceOf(assetManager.address);
      expect(balance).to.equal("100000000");
    });
    it("should allow  Admin Pause Bridge", async function () {
      expect(await bridge.connect(Admin).pauseBrigde()).to.not.throw;
    });
    it("should not allow none  Admin Pause Bridge", async function () {
      await expect(bridge.connect(assetManager).pauseBrigde()).to.revertedWith(
        "U_A"
      );
    });

    it("should be able to register  claim transaction", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());
      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, assetToken.address, true);
      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken.address,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [zeroAddress],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );
      let claimID = await registry.getID(
        2,
        bridge.chainId(),
        assetToken.address,
        "100000000000000000000",
        Admin.address,
        0
      );
      expect(
        await registry
          .connect(oracle)
          .registerClaimTransaction(
            claimID,
            2,
            assetToken.address,
            "100000000000000000000",
            Admin.address,
            0
          )
      ).to.not.throw;
    });
    it("should not be able to validate transaction transaction with value overFlow between Chains", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());
      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, assetToken.address, true);

      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken.address,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [zeroAddress],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );
      let claimID = await registry.getID(
        2,
        bridge.chainId(),
        assetToken.address,
        "100000000000000000000",
        Admin.address,
        0
      );
      await registry
        .connect(oracle)
        .registerClaimTransaction(
          claimID,
          2,
          assetToken.address,
          "100000000000000000000",
          Admin.address,
          0
        );

      let signatures = [];
      let message = await registry.getID(
        bridge.chainId(),
        2,
        assetToken.address,
        "100000000000000000000",
        Admin.address,
        0
      );
      signatures[0] = await validator1.signMessage(message);
      signatures[1] = await validator2.signMessage(message);
      signatures[2] = await validator3.signMessage(message);
      signatures[3] = await validator4.signMessage(message);
      signatures[4] = await validator5.signMessage(message);

      await expect(
        registry
          .connect(validator1)
          .validateTransaction(claimID, signatures, false)
      ).to.revertedWith("Amount_limit_Err");
    });
    it("should not be able to validate with less validators ", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());

      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());
      await settings
        .connect(Admin)
        .setApprovedToAdd(assetManager.address, assetToken.address, true);
      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken.address,
          "100000000000000000000",
          "10000000000000000000000",
          [2],
          [zeroAddress],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      // let fees = await ethers.utils.parseEther(val)
      await bridge.connect(Admin).activeNativeAsset(assetToken.address, true);
      await assetToken
        .connect(assetManager)
        .approve(bridge.address, "100000000000000000000");
      let val = await feeController.getBridgeFee(
        assetManager.address,
        assetToken.address,
        2
      );
      await assetToken
        .connect(assetAdmin)
        .transfer(assetManager.address, "100000000000000000000");
      await bridge
        .connect(assetManager)
        .send(2, assetToken.address, "100000000000000000000", Admin.address, {
          value: val,
        });

      let claimID = await registry.getID(
        2,
        bridge.chainId(),
        assetToken.address,
        "100000000000000000000",
        Admin.address,
        0
      );
      await registry
        .connect(oracle)
        .registerClaimTransaction(
          claimID,
          2,
          assetToken.address,
          "100000000000000000000",
          Admin.address,
          0
        );
      let transaction = await registry.claimTransactions(claimID);
      let signatures = [];
      let id = await bridge.chainId();
      let message = await registry.getID(
        id.toString(),
        transaction[0],
        transaction[1],
        transaction[2],
        transaction[3],
        transaction[4]
      );

      signatures[0] = await validator1.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[1] = await validator1.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[2] = await validator1.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[3] = await validator1.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[4] = await validator1.signMessage(
        await ethers.utils.arrayify(message)
      );

      await expect(
        registry
          .connect(validator3)
          .validateTransaction(claimID, signatures, false)
      ).to.revertedWith("insuficient_signers");
    });
    it("should  be able to validate transaction transaction ", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());
      const assetTokenContract = await ethers.getContractFactory("TestToken");
      const assetToken2 = await assetTokenContract
        .connect(assetManager)
        .deploy("Token", "tkn", 6);

      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken2.address,
          "1000000",
          "1000000000000",
          [2],
          [zeroAddress],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      // let fees = await ethers.utils.parseEther(val)
      await bridge.connect(Admin).activeNativeAsset(assetToken2.address, true);
      await assetToken2
        .connect(assetManager)
        .approve(bridge.address, "1000000000");
      let val = await feeController.getBridgeFee(
        assetManager.address,
        assetToken2.address,
        2
      );

      await bridge
        .connect(assetManager)
        .send(2, assetToken2.address, "1000000000", Admin.address, {
          value: val,
        });

      let claimID = await registry.getID(
        2,
        bridge.chainId(),
        assetToken2.address,
        "1000000000000000000000",
        Admin.address,
        0
      );
      await registry
        .connect(oracle)
        .registerClaimTransaction(
          claimID,
          2,
          assetToken2.address,
          "1000000000000000000000",
          Admin.address,
          0
        );
      let transaction = await registry.claimTransactions(claimID);

      let signatures = [];
      let id = await bridge.chainId();
      let message = await registry.getID(
        id.toString(),
        transaction[0],
        transaction[1],
        transaction[2],
        transaction[3],
        transaction[4]
      );
      signatures[0] = await validator1.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[1] = await validator2.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[2] = await validator3.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[3] = await validator4.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[4] = await validator5.signMessage(
        await ethers.utils.arrayify(message)
      );

      await expect(
        registry
          .connect(validator3)
          .validateTransaction(claimID, signatures, false)
      ).to.not.throw;
    });
    it("should  be able to validate transaction transaction and send correctValue ", async function () {
      await settings.connect(Admin).setNetworkSupportedChains([2], [10], true);
      await brgToken
        .connect(Admin)
        .transfer(assetManager.address, settings.railRegistrationFee());
      await brgToken
        .connect(assetManager)
        .approve(bridge.address, settings.railRegistrationFee());
      const assetTokenContract = await ethers.getContractFactory("TestToken");
      const assetToken2 = await assetTokenContract
        .connect(assetManager)
        .deploy("Token", "tkn", 6);

      await bridge
        .connect(assetManager)
        .registerRail(
          assetToken2.address,
          "1000000",
          "1000000000000",
          [2],
          [zeroAddress],
          false,
          assetFeeRemittance.address,
          assetManager.address,
          2
        );

      // let fees = await ethers.utils.parseEther(val)
      await bridge.connect(Admin).activeNativeAsset(assetToken2.address, true);
      await assetToken2
        .connect(assetManager)
        .approve(bridge.address, "1000000000");
      let val = await feeController.getBridgeFee(
        assetManager.address,
        assetToken2.address,
        2
      );

      await bridge
        .connect(assetManager)
        .send(2, assetToken2.address, "1000000000", Admin.address, {
          value: val,
        });

      let claimID = await registry.getID(
        2,
        bridge.chainId(),
        assetToken2.address,
        "1000000000000000000000",
        Admin.address,
        0
      );
      await registry
        .connect(oracle)
        .registerClaimTransaction(
          claimID,
          2,
          assetToken2.address,
          "1000000000000000000000",
          Admin.address,
          0
        );
      let transaction = await registry.claimTransactions(claimID);

      let signatures = [];
      let id = await bridge.chainId();
      let message = await registry.getID(
        id.toString(),
        transaction[0],
        transaction[1],
        transaction[2],
        transaction[3],
        transaction[4]
      );
      signatures[0] = await validator1.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[1] = await validator2.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[2] = await validator3.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[3] = await validator4.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[4] = await validator5.signMessage(
        await ethers.utils.arrayify(message)
      );

      await registry
        .connect(validator3)
        .validateTransaction(claimID, signatures, false);

      let balance = await assetToken2.balanceOf(Admin.address);
      expect(balance).to.equal("1000000000");
    });
    it("should be able to register foriegn asset", async function () {
      await settings
        .connect(Admin)
        .setNetworkSupportedChains([2], ["10000000000000000000"], true);
      await settings.isNetworkSupportedChain(2);
      expect(
        await bridge
          .connect(registrar)
          .addForiegnAsset(
            zeroAddress,
            2,
            ["100000000000000000000", "10000000000000000000000"],
            ["test", "test"],
            true,
            assetManager.address,
            assetFeeRemittance.address,
            1,
            false,
            zeroAddress
          )
      ).to.not.throw;
    });
    it("should be able to mint Transaction", async function () {
      await settings
        .connect(Admin)
        .setNetworkSupportedChains([2], ["10000000000000000000"], true);
      await bridge
        .connect(registrar)
        .addForiegnAsset(
          zeroAddress,
          2,
          ["100000000000000000000", "10000000000000000000000"],
          ["test", "test"],
          true,
          assetManager.address,
          assetFeeRemittance.address,
          1,
          false,
          zeroAddress
        );
      await bridge.wrappedForiegnPair(zeroAddress, 2);
      let mintID = await registry.getID(
        2,
        bridge.chainId(),
        zeroAddress,
        "100000000000000000000",
        Admin.address,
        0
      );
      expect(
        await registry
          .connect(oracle)
          .registerMintTransaction(
            mintID,
            2,
            zeroAddress,
            "100000000000000000000",
            Admin.address,
            0
          )
      ).to.not.throw;
    });
    it("should be able to validate mint Transaction", async function () {
      await settings
        .connect(Admin)
        .setNetworkSupportedChains([2], ["10000000000000000000"], true);
      await bridge
        .connect(registrar)
        .addForiegnAsset(
          zeroAddress,
          2,
          ["100000000000000000000", "10000000000000000000000"],
          ["test", "test"],
          true,
          assetManager.address,
          assetFeeRemittance.address,
          1,
          false,
          zeroAddress
        );
      let wrapped = await bridge.wrappedForiegnPair(zeroAddress, 2);
      let mintID = await registry.getID(
        2,
        bridge.chainId(),
        zeroAddress,
        "100000000000000000000",
        Admin.address,
        0
      );
      await registry
        .connect(oracle)
        .registerMintTransaction(
          mintID,
          2,
          zeroAddress,
          "100000000000000000000",
          Admin.address,
          0
        );

      let transaction = await registry.mintTransactions(mintID);

      let signatures = [];
      let id = await bridge.chainId();
      let message = await registry.getID(
        id.toString(),
        transaction[0],
        transaction[1],
        transaction[2],
        transaction[3],
        transaction[4]
      );

      signatures[0] = await validator1.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[1] = await validator2.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[2] = await validator3.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[3] = await validator4.signMessage(
        await ethers.utils.arrayify(message)
      );
      signatures[4] = await validator5.signMessage(
        await ethers.utils.arrayify(message)
      );

      await registry
        .connect(validator3)
        .validateTransaction(mintID, signatures, true);

      let wrappedAddress = await bridge.wrappedForiegnPair(zeroAddress, 2);
      let wrappedToken = await ethers.getContractAt(
        "WrappedToken",
        wrappedAddress,
        Admin
      );
      let balance = await wrappedToken.balanceOf(Admin.address);
      expect(balance).to.equal("100000000000000000000");
    });
  });
});
