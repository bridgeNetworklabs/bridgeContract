import { ethers } from "hardhat";
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
} from "../typechain-types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { describe } from "mocha";
import { parseEther } from "ethers/lib/utils";

describe("BridgeSocket", () => {
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
  let socket: BridgeSocket;
  let asset1: Token;
  let brdg: Token;

  beforeEach(async () => {
    [
      feeRemittance,
      owner,
      admin,
      recoveryAdmin,
      randomAddress,
      lossLess,
      assetOwner,
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
    const BridgeSocketContract = await ethers.getContractFactory(
      "BridgeSocket"
    );
    socket = await BridgeSocketContract.connect(owner).deploy();
    await registry.connect(owner).transferOwnership(bridge.address);
  });

  describe("Update Socket", () => {
    it("Should update socket contract", async () => {
      const tx = await socket
        .connect(owner)
        .updateSocket(feeController.address, settings.address, bridge.address);
      expect(tx)
        .emit(deployer, "socketUpdated")
        .withArgs(feeController.address, settings.address, bridge.address);
      expect(await socket.bridge()).to.be.equal(bridge.address);
      expect(await socket.feeController()).to.be.equal(feeController.address);
      expect(await socket.settings()).to.be.equal(settings.address);
    });

    it("Should revert if random address update socket contracts", async () => {
      await expect(
        socket
          .connect(randomAddress)
          .updateSocket(feeController.address, settings.address, bridge.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("updateFeeRemittance", () => {
    it("Should update the fee remittance address", async () => {
      const tx = await socket
        .connect(owner)
        .updateFeeRemitance(feeRemittance.address);
      expect(await socket.feeRemitance()).to.be.equal(feeRemittance.address);
      expect(tx)
        .emit(socket, "feeRemitanceUpdated")
        .withArgs(ethers.constants.AddressZero, feeRemittance.address);
    });

    it("Should update the fee remittance address", async () => {
      await expect(
        socket.connect(randomAddress).updateFeeRemitance(feeRemittance.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Bridge Asset", () => {
    beforeEach(async () => {
      const TestToken = await ethers.getContractFactory("Token");
      asset1 = await TestToken.connect(assetOwner).deploy("Asset_One", "Ass1");
      await settings.connect(owner).setbrgToken(brdg.address);
      await settings.connect(owner).setrailRegistrationFee(parseEther("500"));
      await settings.setNetworkSupportedChains(
        [1, 2, 9],
        [parseEther("0.01"), parseEther("0.01"), parseEther("0.01")],
        true
      );
      await brdg.connect(owner).approve(assetOwner.address, parseEther("1000"));
      await brdg
        .connect(owner)
        .transfer(assetOwner.address, parseEther("3000"));
      await brdg
        .connect(assetOwner)
        .approve(socket.address, parseEther("1000"));
      await brdg
        .connect(assetOwner)
        .approve(bridge.address, parseEther("2000"));
      await bridge
        .connect(assetOwner)
        .registerRail(
          asset1.address,
          parseEther("0.01"),
          parseEther("10000"),
          [1, 2, 9],
          [],
          false,
          assetOwner.address,
          assetOwner.address,
          0
        );
      await bridge.connect(owner).activeNativeAsset(asset1.address, true);
    });
    it("Should bridge asset", async () => {
      await socket
        .connect(owner)
        .updateSocket(feeController.address, settings.address, bridge.address);
      //console.log(await bridge.nativeAssets(asset1.address))
      await asset1
        .connect(assetOwner)
        .approve(socket.address, parseEther("100"));
      await socket.connect(owner).updateFeeRemitance(feeRemittance.address);
      const tx = await socket
        .connect(assetOwner)
        .bridgeAsset(
          asset1.address,
          2,
          parseEther("0.02"),
          randomAddress.address,
          { value: parseEther("0.01") }
        );

      let transactionID = await registry.getID(
        bridge.chainId(),
        2,
        asset1.address,
        parseEther("0.02"),
        randomAddress.address,
        registry.getUserNonce(assetOwner.address)
      );
      expect(tx).to.not.throw;
      expect(tx)
        .emit(deployer, "SendTransaction")
        .withArgs(
          transactionID,
          2,
          asset1.address,
          parseEther("0.02"),
          randomAddress.address,
          assetOwner.address
        );
    });
  });

  describe("pauseSocket", () => {
    it("Should be revert because socket is not set", async () => {
      await expect(socket.connect(owner).pauseSocket()).to.be.revertedWith("socket not set")
    })
    it("Should be able to pause when socket is set", async () => {
      await socket
        .connect(owner)
        .updateSocket(feeController.address, settings.address, bridge.address);
      await socket.connect(owner).pauseSocket()
      expect(await socket.paused()).to.be.true
    })
  })
});
