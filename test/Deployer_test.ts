import { ethers } from "hardhat";
import type {
  Settings,
  Controller,
  FeeController,
  Deployer,
  Bridge,
  BridgePool,
  Registry,
} from "../typechain-types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { describe } from "mocha";

describe("Deployer", () => {
  let deployer: Deployer;
  let controller: Controller;
  let owner: SignerWithAddress;
  let admin: SignerWithAddress;
  let randomAddress: SignerWithAddress;
  let recoveryAdmin: SignerWithAddress;
  let lossLess: SignerWithAddress;
  let feeRemittance: SignerWithAddress;
  let bridge: Bridge;
  let settings: Settings;
  let pool: BridgePool;
  let registry: Registry;
  let feeController: FeeController;

  beforeEach(async () => {
    [feeRemittance, owner, admin, recoveryAdmin, randomAddress, lossLess] =
      await ethers.getSigners();
    const controllerContract = await ethers.getContractFactory("Controller");
    controller = await controllerContract.connect(owner).deploy();
    await controller.connect(owner).addAdmin(admin.address, true);
    const DeployerContract = await ethers.getContractFactory("Deployer");
    deployer = await DeployerContract.deploy(controller.address);
    const registryContract = await ethers.getContractFactory("Registry");
    registry = await registryContract.deploy();
    const SettingContract = await ethers.getContractFactory("Settings");
    settings = await SettingContract.deploy(
      controller.address,
      feeRemittance.address,
      owner.address
    );
    const feeControllerContract = await ethers.getContractFactory(
      "FeeController"
    );
    feeController = await feeControllerContract.deploy(
      controller.address,
      settings.address
    );
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
  });

  describe("Constructor", () => {
    it("Should set the controller address correctly", async () => {
      expect(await deployer.controller()).to.be.equal(controller.address);
    });
  });

  describe("deployerWrappedAsset", () => {
    it("it should revert if caller is not the bridge", async () => {
      await expect(
        deployer.deployerWrappedAsset("tokenName", "tokenSymbol", 1)
      ).to.be.revertedWith("U_A");
    });

    describe("Update bridge", () => {
      it("Should update bridge address correctly", async () => {
        const tx = await deployer.connect(owner).updateBridge(bridge.address);
        expect(tx)
          .emit(deployer, "BridgeUpdated")
          .withArgs(ethers.constants.AddressZero, bridge.address);
        expect(await deployer.bridge()).to.be.equal(bridge.address);
      });

      it("Should revert if random address tries to update bridge address", async () => {
        await expect(
          deployer.connect(randomAddress).updateBridge(bridge.address)
        ).to.be.revertedWith(" caller is not the owner");
      });

      it("Should revert if bridge address is address zero", async () => {
        await expect(
          deployer.connect(owner).updateBridge(ethers.constants.AddressZero)
        ).to.be.revertedWith("zero Address");
      });
    });

    describe("EnableLossLess", () => {
      it("it should enable lossless", async () => {
        const tx = await deployer.connect(owner).enableLossLess(false);
        expect(tx).emit(deployer, "lossLessEnableStateUpdated").withArgs(false);
        expect(await deployer.losslessEnabled()).to.be.false;
      });

      it("Should revert if random address tries to update bridge address", async () => {
        await expect(
          deployer.connect(randomAddress).enableLossLess(true)
        ).to.be.revertedWith(" caller is not the owner");
      });

      it("it should enable lossless", async () => {
        await deployer.connect(owner).enableLossLess(false);
        const tx = await deployer.connect(owner).enableLossLess(true);
        expect(tx).emit(deployer, "lossLessEnableStateUpdated").withArgs(true);
        expect(await deployer.losslessEnabled()).to.be.true;
      });
    });

    describe("updateLossless", () => {
      it("Should update lossLess variables", async () => {
        const tx = await deployer
          .connect(owner)
          .updateLossless(
            recoveryAdmin.address,
            86400,
            "0x2FD17Fa5D72d4d08a8Acd9990F4913Ea96551243"
          ); // lossless controller address for rinkeby
        expect(tx)
          .emit(deployer, "LosslessUpdated")
          .withArgs(
            ethers.constants.AddressZero,
            recoveryAdmin.address,
            0,
            86400,
            ethers.constants.AddressZero,
            "0x2FD17Fa5D72d4d08a8Acd9990F4913Ea96551243"
          );
        expect(await deployer.losslessRecoveryAdmin_()).to.be.equal(
          recoveryAdmin.address
        );
        expect(await deployer.timelockPeriod_()).to.be.equal(86400);
        expect(await deployer.lossless_()).to.be.equal(
          "0x2FD17Fa5D72d4d08a8Acd9990F4913Ea96551243"
        );
      });

      it("Should revert if random address tries to update lossless", async () => {
        await expect(
          deployer
            .connect(randomAddress)
            .updateLossless(
              recoveryAdmin.address,
              86400,
              "0x2FD17Fa5D72d4d08a8Acd9990F4913Ea96551243"
            )
        ).to.be.revertedWith(" caller is not the admin");
      });
    });
  });
});
