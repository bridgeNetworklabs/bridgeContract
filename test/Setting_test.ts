import { ethers } from "hardhat";
import type { Settings, Controller, Token } from "../typechain-types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";

describe("Settings", () => {
  let settings: Settings;
  let controller: Controller;
  let feeRemittance: SignerWithAddress;
  let owner: SignerWithAddress;
  let admin: SignerWithAddress;
  let randomAddress: SignerWithAddress;
  let token: Token;
  let assetUser: SignerWithAddress;

  before(async () => {
    [feeRemittance, owner, admin, assetUser, randomAddress] =
      await ethers.getSigners();
    const controllerContract = await ethers.getContractFactory("Controller");
    controller = await controllerContract.connect(owner).deploy();
    await controller.connect(owner).addAdmin(admin.address, true);

    const SettingsContract = await ethers.getContractFactory("Settings");
    settings = await SettingsContract.deploy(
      controller.address,
      feeRemittance.address
    );

    const TokenContract = await ethers.getContractFactory("Token");
    token = await TokenContract.deploy("AssetOne", "A1");
  });

  describe("State Variables", () => {
    it("fee remittance address sgould be correct", async () => {
      expect(await settings.feeRemitance()).to.be.eql(feeRemittance.address);
    });
    it("railRegistration should be 5000 token", async () => {
      expect(await settings.railRegistrationFee()).to.be.equal(
        parseEther("5000")
      );
    });
    it("railOwner fee share should be 20%", async () => {
      expect(await settings.railOwnerFeeShare()).to.be.equal(20);
    });
    it("minimum withdraw amount should be 0.1 ether", async () => {
      expect(await settings.minWithdrawableFee()).to.be.equal(
        parseEther("0.1")
      );
    });
    it("minimum validation percentage is 51%", async () => {
      expect(await settings.minValidationPercentage()).to.be.equal(51);
    });
    it("maximum fee threshold is 300000 ", async () => {
      expect(await settings.maxFeeThreshold()).to.be.equal(
        parseEther("300000")
      );
    });
    it("validation percentage should be 51%", async () => {
      expect(await settings.ValidationPercentage()).to.be.equal(51);
    });
    it("base fee percentage should be 10%", async () => {
      expect(await settings.baseFeePercentage()).to.be.equal(10);
    });
  });

  describe("Function", () => {
    it("Should allow a user to add a token", async () => {
      await settings
        .connect(admin)
        .setApprovedToAdd(assetUser.address, token.address, true);
      expect(await settings.approvedToAdd(token.address, assetUser.address)).to
        .be.true;
    });
    it("Should fail if randomAddress try to approve a user to add a token", async () => {
      await expect(
        settings
          .connect(randomAddress)
          .setApprovedToAdd(assetUser.address, token.address, true)
      ).to.be.revertedWith("U_A");
    });
    it("Should fail if randomAddress try to remove a user from adding a token", async () => {
      await expect(
        settings
          .connect(randomAddress)
          .setApprovedToAdd(assetUser.address, token.address, false)
      ).to.be.revertedWith("U_A");
    });
    it("Should remove a user from adding a token", async () => {
      await settings
        .connect(admin)
        .setApprovedToAdd(assetUser.address, token.address, false);
      expect(await settings.approvedToAdd(token.address, assetUser.address)).to
        .be.false;
    });
    it("Should set validation percentage", async () => {
      await settings.connect(owner).setMinValidationPercentage(60);
      expect(await settings.ValidationPercentage()).to.be.equal(60);
    });
    it("Should fail if randomAddress try to set validation percentage", async () => {
      await expect(
        settings.connect(randomAddress).setMinValidationPercentage(65)
      ).to.be.revertedWith("U_A");
    });
    it("Should revert if the validation percentage is the same", async () => {
      await expect(
        settings.connect(owner).setMinValidationPercentage(60)
      ).to.be.revertedWith("same");
    });
    it("Should revert if validation percent per is less than minimum validation percent", async () => {
      await expect(
        settings.connect(owner).setMinValidationPercentage(40)
      ).to.be.revertedWith("valueERR");
    });
    it("Should revert if validation percent per is more than 100 percent", async () => {
      await expect(
        settings.connect(owner).setMinValidationPercentage(105)
      ).to.be.revertedWith("valueERR");
    });
    it("Should set the base Percentage", async () => {
        await settings.connect(owner).setbaseFeePercentage(20)
        expect(await settings.baseFeePercentage()).to.be.equal(20)
    });
    it("Should revert if random address tries to set base percentage", async () => {
      await expect(
        settings.connect(randomAddress).setbaseFeePercentage(20)
      ).to.be.revertedWith("U_A");
    });
  });
});
