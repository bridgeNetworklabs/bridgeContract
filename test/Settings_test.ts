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
  let brdgToken: Token;

  before(async () => {
    [feeRemittance, owner, admin, assetUser, randomAddress] =
      await ethers.getSigners();
    const controllerContract = await ethers.getContractFactory("Controller");
    controller = await controllerContract.connect(owner).deploy();
    await controller.connect(owner).addAdmin(admin.address, true);

    const SettingsContract = await ethers.getContractFactory("Settings");
    settings = await SettingsContract.deploy(
      controller.address,
      feeRemittance.address,
      owner.address
    );

    const TokenContract = await ethers.getContractFactory("Token");
    token = await TokenContract.deploy("AssetOne", "A1");
    const BrdgContract = await ethers.getContractFactory("Token");
    brdgToken = await BrdgContract.deploy("Bridge Token", "brdg");
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
      expect(await settings.maxFeeThreshold()).to.be.equal("1000");
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
      await settings.connect(owner).setbaseFeePercentage(20);
      expect(await settings.baseFeePercentage()).to.be.equal(20);
    });
    it("Should revert if random address tries to set base percentage", async () => {
      await expect(
        settings.connect(randomAddress).setbaseFeePercentage(20)
      ).to.be.revertedWith("U_A");
    });
    it("Should revert if base fee is more than 10% ", async () => {
      await expect(
        settings.connect(owner).setbaseFeePercentage(2000)
      ).to.be.revertedWith("exceed 10%");
    });
    it("Only Owner should enable base fee", async () => {
      await settings.connect(owner).enableBaseFee();
      expect(await settings.baseFeeEnable()).to.be.true;
    });
    it("Should revert if random address enable base fee", async () => {
      await expect(
        settings.connect(randomAddress).enableBaseFee()
      ).to.be.revertedWith("U_A");
    });
    it("Should set bridge token", async () => {
      await settings.connect(admin).setbrgToken(brdgToken.address);
      expect(await settings.brgToken()).to.be.equal(brdgToken.address);
    });
    it("Should revert if random address tries to set the bridge token", async () => {
      await expect(
        settings.connect(randomAddress).setbrgToken(brdgToken.address)
      ).to.be.revertedWith("U_A");
    });
    it("Should revert if setting zero address as bridge token", async () => {
      await expect(
        settings.connect(owner).setbrgToken(ethers.constants.AddressZero)
      ).to.be.revertedWith("zero_A");
    });
    it("Should set minimum withdrawable fee", async () => {
      await settings.connect(admin).setminWithdrawableFee(parseEther("0.01"));
      expect(await settings.minWithdrawableFee()).to.be.equal(
        parseEther("0.01")
      );
    });
    it("Should revert if random address set minimum withdrawable fee", async () => {
      await expect(
        settings
          .connect(randomAddress)
          .setminWithdrawableFee(parseEther("0.002"))
      ).to.be.revertedWith("U_A");
    });
    it("Should set bridge Supported Chain and fee", async () => {
      await settings
        .connect(owner)
        .setNetworkSupportedChains(
          [1, 2, 9],
          [parseEther("0.01"), parseEther("0.02"), parseEther("0.09")],
          true
        );
      const supoortedChain = await (
        await settings.getNetworkSupportedChains()
      ).toString();
      expect(supoortedChain.includes("1")).to.be.true;
      expect(supoortedChain.includes("2")).to.be.true;
      expect(supoortedChain.includes("9")).to.be.true;
      expect(await settings.networkGas(1)).to.be.equal(parseEther("0.01"));
      expect(await settings.networkGas(2)).to.be.equal(parseEther("0.02"));
      expect(await settings.networkGas(9)).to.be.equal(parseEther("0.09"));
    });

    it("Should revert if of length of chainId and fees does not match ", async () => {
      await expect(
        settings
          .connect(owner)
          .setNetworkSupportedChains(
            [1, 2],
            [parseEther("0.01"), parseEther("0.02"), parseEther("0.09")],
            true
          )
      ).to.be.revertedWith("invalid");

      await expect(
        settings
          .connect(owner)
          .setNetworkSupportedChains(
            [1, 2, 9],
            [parseEther("0.01"), parseEther("0.02")],
            true
          )
      ).to.be.revertedWith("invalid");
    });
    // it("Should revert if fee is more than maximum fee threshold", async () => {
    //   await expect(
    //     settings
    //       .connect(owner)
    //       .setNetworkSupportedChains(
    //         [1, 2, 9],
    //         [parseEther("0.01"), parseEther("0.02"), parseEther("3000000")],
    //         true
    //       )
    //   ).to.be.revertedWith("fee threshold Error");
    // });
    it("Should update network fee", async () => {
      await settings.connect(admin).updateNetworkGas(9, parseEther("0.05"));
      expect(await settings.networkGas(9)).to.be.equal(parseEther("0.05"));
    });
    it("Should revert if update fee for a non supported chain", async () => {
      await expect(
        settings.connect(admin).updateNetworkGas(5, parseEther("0.05"))
      ).to.be.revertedWith("not Supported");
    });
    it("Should revert if random address update fee", async () => {
      await expect(
        settings.connect(randomAddress).updateNetworkGas(2, parseEther("0.05"))
      ).to.be.revertedWith("U_A");
    });
    it("Should set rail Owner rail fee", async () => {
      await settings.connect(admin).setRailOwnerFeeShare(30);
      expect(await settings.railOwnerFeeShare()).to.be.equal(30);
    });
    it("Should revert if rail is set by random Address", async () => {
      await expect(
        settings.connect(randomAddress).setRailOwnerFeeShare(40)
      ).be.revertedWith("U_A");
    });

    it("Should set updatable asset state", async function () {
      await settings.connect(admin).setUpdatableAssetState(false);
      expect(await settings.updatableAssetState()).to.be.false;
    });
    it("Should set Only Ownable rail State", async function () {
      await settings.connect(admin).setOnlyOwnableRailState(false);
      expect(await settings.onlyOwnableRail()).to.be.false;
    });

    it("Should set rail registration fee", async function () {
      await settings.connect(admin).setrailRegistrationFee(30);
      expect(await settings.railRegistrationFee()).to.equal(30);
    });
  });
});
