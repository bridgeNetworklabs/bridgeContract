import { Bridge } from "./../typechain-types/contracts/Bridge";
import { getIncentiveIdentifier } from "./utils/utils";
import { ethers } from "hardhat";
import type {
  Settings,
  Controller,
  Token,
  FeeController,
} from "../typechain-types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";

describe("FeeController", () => {
  let feeController: FeeController;
  let controller: Controller;
  let settings: Settings;
  let feeRemittance: SignerWithAddress;
  let owner: SignerWithAddress;
  let admin: SignerWithAddress;
  let randomAddress: SignerWithAddress;
  let assetUser: SignerWithAddress;
  let assetUser2: SignerWithAddress;
  let asset1: Token;
  let brdgToken: Token;
  const COMMON = getIncentiveIdentifier("COMMON");
  const ALPHA = getIncentiveIdentifier("ALPHA");
  const BETA = getIncentiveIdentifier("BETA");

  enum HoldingLevels {
    COMMON,
    BETA,
    ALPHA,
  }

  beforeEach(async () => {
    [feeRemittance, owner, admin, assetUser, randomAddress, assetUser2] =
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
    const feeControllerContract = await ethers.getContractFactory(
      "FeeController"
    );
    feeController = await feeControllerContract.deploy(
      controller.address,
      settings.address
    );
    const TokenContract = await ethers.getContractFactory("Token");
    asset1 = await TokenContract.deploy("AssetOne", "A1");
    const BrdgContract = await ethers.getContractFactory("Token");
    brdgToken = await BrdgContract.connect(owner).deploy(
      "Bridge Token",
      "brdg"
    );
  });

  describe("Constructor", () => {
    it("Should properly assign controller contract and settings contract", async () => {
      expect(await feeController.controller()).to.be.equal(controller.address);
      expect(await feeController.settings()).to.be.equal(settings.address);
    });
  });

  describe("Bridge holding incentive", () => {
    it("Should activate bridge holding incentive ", async () => {
      const tx = await feeController
        .connect(admin)
        .activateBRDGHoldingIncentive(true);
      expect(await feeController.useBRDGHoldingIncentive()).to.be.true;
      expect(tx)
        .emit(feeController, "BrgHoldingIncentiveStatusChanged")
        .withArgs(true);
    });

    it("Should deactivate bridge holding incentive ", async () => {
      await feeController.connect(admin).activateBRDGHoldingIncentive(true);
      const tx = await feeController
        .connect(admin)
        .activateBRDGHoldingIncentive(false);
      expect(await feeController.useBRDGHoldingIncentive()).to.be.false;
      expect(tx)
        .emit(feeController, "BrgHoldingIncentiveStatusChanged")
        .withArgs(false);
    });

    it("Should revert if random address tries to active bridge holding incentive ", async () => {
      await expect(
        feeController.connect(randomAddress).activateBRDGHoldingIncentive(true)
      ).to.be.revertedWith("caller is not the admin");
    });
  });

  describe("Asset incentive", () => {
    it("Should activate asset incentive ", async () => {
      const tx = await feeController
        .connect(admin)
        .activateAssetIncentive(true);
      expect(await feeController.useAssetIncentive()).to.be.true;
      expect(tx)
        .emit(feeController, "AssetIncentiveStatusChanged")
        .withArgs(true);
    });

    it("Should deactivate asset incentive ", async () => {
      await feeController.connect(admin).activateAssetIncentive(true);
      const tx = await feeController
        .connect(admin)
        .activateAssetIncentive(false);
      expect(tx)
        .emit(feeController, "AssetIncentiveStatusChanged")
        .withArgs(false);
      expect(await feeController.useAssetIncentive()).to.be.false;
    });

    it("Should revert if random address tries to activate or deactivate asset incentive ", async () => {
      await expect(
        feeController.connect(randomAddress).activateAssetIncentive(true)
      ).to.be.revertedWith("caller is not the admin");
      await feeController.connect(admin).activateAssetIncentive(true);
      await expect(
        feeController.connect(randomAddress).activateAssetIncentive(true)
      ).to.be.revertedWith("caller is not the admin");
    });
  });

  describe("Address exemption", () => {
    it("Should activate address exemption ", async () => {
      const tx = await feeController
        .connect(admin)
        .activateAddressExemption(true);
      expect(tx)
        .emit(feeController, "AddressExemptionStatusChanged")
        .withArgs(true);
      expect(await feeController.useExemption()).to.be.true;
    });

    it("Should deactivate address exemption ", async () => {
      await feeController.connect(admin).activateAddressExemption(true);
      const tx = await feeController
        .connect(admin)
        .activateAddressExemption(false);
      expect(tx)
        .emit(feeController, "AddressExemptionStatusChanged")
        .withArgs(false);
      expect(await feeController.useExemption()).to.be.false;
    });

    it("Should revert if random address tries to activate or deactivate address exemption ", async () => {
      await expect(
        feeController.connect(randomAddress).activateAddressExemption(true)
      ).to.be.revertedWith("caller is not the admin");
      await feeController.connect(admin).activateAddressExemption(true);
      await expect(
        feeController.connect(randomAddress).activateAddressExemption(true)
      ).to.be.revertedWith("caller is not the admin");
    });
  });

  describe("User Exemption", () => {
    it("Should exempt an address", async () => {
      const tx = await feeController
        .connect(owner)
        .exemptAddress(assetUser.address, true);
      expect(tx)
        .emit(feeController, "userExemptStatusChanged")
        .withArgs(assetUser.address, true);
      expect(await feeController.isExempted(assetUser.address)).to.be.true;
    });

    it("Should nonexempt an address", async () => {
      await feeController.connect(owner).exemptAddress(assetUser.address, true);
      const tx = await feeController
        .connect(owner)
        .exemptAddress(assetUser.address, false);
      expect(await feeController.isExempted(assetUser.address)).to.be.false;
      expect(tx)
        .emit(feeController, "userExemptStatusChanged")
        .withArgs(assetUser.address, false);
    });

    it("Should revert if random address tries to exempt or nonexempt an address", async () => {
      await expect(
        feeController
          .connect(randomAddress)
          .exemptAddress(assetUser.address, true)
      ).to.be.revertedWith("caller is not the owner");
      await feeController.connect(owner).exemptAddress(assetUser.address, true);
      await expect(
        feeController
          .connect(randomAddress)
          .exemptAddress(assetUser.address, false)
      ).to.be.revertedWith("caller is not the owner");
    });
  });

  describe("user incentivization", () => {
    it("Should set an user incentive percent", async () => {
      await feeController
        .connect(admin)
        .activateIndexedUserIncentive(assetUser.address);
      const tx = await feeController
        .connect(owner)
        .updateUserExemptionPercentage(assetUser.address, 40);
      expect(
        (await feeController.indexedUserIncentive(assetUser.address))
          .incentivePercentage
      ).to.be.equal(40);
      expect(tx)
        .emit(feeController, "AssetIncentiveUpdated")
        .withArgs(assetUser.address, true);
    });

    it("Should deactivate user incentive percent", async () => {
      await feeController
        .connect(admin)
        .activateIndexedUserIncentive(assetUser.address);
      await feeController
        .connect(admin)
        .deActivateIndexedUserIncentive(assetUser.address);
      await expect(
        feeController
          .connect(owner)
          .updateUserExemptionPercentage(assetUser.address, 40)
      ).to.be.revertedWith("FeeController: user exemption not active");
      expect(
        (await feeController.indexedUserIncentive(assetUser.address)).isActive
      ).to.be.equal(false);
    });

    it("Should revert if any address apart from owner tries to set user incentive percent", async () => {
      await expect(
        feeController
          .connect(randomAddress)
          .updateUserExemptionPercentage(asset1.address, 90)
      ).to.be.revertedWith("caller is not the admin");
    });
  });

  describe("Bridge Holding Threshold", () => {
    it("Should update the COMMON threshold", async () => {
      await feeController
        .connect(owner)
        .updateBRDGHoldingIncentiveThreshold(
          HoldingLevels.COMMON,
          parseEther("100000")
        );
      expect(
        (await feeController.tokenHolderIncentive(HoldingLevels.COMMON))
          .threshold
      ).to.be.equal(parseEther("100000"));
    });

    it("Should revert if COMMON Threshold is more than ALPHA and BETA Threshold", async () => {
      const BETA_THRESHOLD = (
        await feeController.tokenHolderIncentive(HoldingLevels.BETA)
      ).threshold;
      const ALPHA_THRESHOLD = (
        await feeController.tokenHolderIncentive(HoldingLevels.ALPHA)
      ).threshold;
      await expect(
        feeController
          .connect(owner)
          .updateBRDGHoldingIncentiveThreshold(
            HoldingLevels.COMMON,
            BETA_THRESHOLD.add(parseEther("1"))
          )
      ).to.be.reverted;
      await expect(
        feeController
          .connect(owner)
          .updateBRDGHoldingIncentiveThreshold(
            HoldingLevels.COMMON,
            ALPHA_THRESHOLD.add(parseEther("1"))
          )
      ).to.be.reverted;
    });

    it("Should update the BETA Threshold", async () => {
      await feeController
        .connect(owner)
        .updateBRDGHoldingIncentiveThreshold(
          HoldingLevels.BETA,
          parseEther("3000000")
        );
      expect(
        (await feeController.tokenHolderIncentive(HoldingLevels.BETA)).threshold
      ).to.be.equal(parseEther("3000000"));
    });

    it("Should revert if the BETA Threshold is less than or equal to the COMMON threshold", async () => {
      const COMMON_THRESHOLD = (
        await feeController.tokenHolderIncentive(HoldingLevels.COMMON)
      ).threshold;
      await expect(
        feeController
          .connect(owner)
          .updateBRDGHoldingIncentiveThreshold(
            HoldingLevels.BETA,
            COMMON_THRESHOLD
          )
      ).to.be.reverted;
      await expect(
        feeController
          .connect(owner)
          .updateBRDGHoldingIncentiveThreshold(
            HoldingLevels.BETA,
            COMMON_THRESHOLD.sub(1)
          )
      ).to.be.reverted;
    });

    it("Should revert if the BETA Threshold is more than or equal to the ALPHA threshold", async () => {
      const ALPHA_THRESHOLD = (
        await feeController.tokenHolderIncentive(HoldingLevels.ALPHA)
      ).threshold;
      await expect(
        feeController
          .connect(owner)
          .updateBRDGHoldingIncentiveThreshold(
            HoldingLevels.BETA,
            ALPHA_THRESHOLD
          )
      ).to.be.reverted;
      await expect(
        feeController
          .connect(owner)
          .updateBRDGHoldingIncentiveThreshold(
            HoldingLevels.BETA,
            ALPHA_THRESHOLD.add(1)
          )
      ).to.be.reverted;
    });

    it("Should update the ALPHA Threshold", async () => {
      const BETA_THRESHOLD = (
        await feeController.tokenHolderIncentive(HoldingLevels.BETA)
      ).threshold;
      await feeController
        .connect(owner)
        .updateBRDGHoldingIncentiveThreshold(
          HoldingLevels.ALPHA,
          BETA_THRESHOLD.add(1)
        );
      expect(
        (await feeController.tokenHolderIncentive(HoldingLevels.ALPHA))
          .threshold
      ).to.be.equal(BETA_THRESHOLD.add(1));
    });

    it("Should revert if the ALPHA Threshold is less than or equal to the BETA threshold", async () => {
      const BETA_THRESHOLD = (
        await feeController.tokenHolderIncentive(HoldingLevels.BETA)
      ).threshold;
      await expect(
        feeController
          .connect(owner)
          .updateBRDGHoldingIncentiveThreshold(
            HoldingLevels.ALPHA,
            BETA_THRESHOLD
          )
      ).to.be.reverted;
      await expect(
        feeController
          .connect(owner)
          .updateBRDGHoldingIncentiveThreshold(
            HoldingLevels.ALPHA,
            BETA_THRESHOLD.sub(1)
          )
      ).to.be.reverted;
    });

    it("Should revert if the ALPHA Threshold is less than or equal to the COMMON threshold", async () => {
      const COMMON_THRESHOLD = (
        await feeController.tokenHolderIncentive(HoldingLevels.COMMON)
      ).threshold;
      await expect(
        feeController
          .connect(owner)
          .updateBRDGHoldingIncentiveThreshold(
            HoldingLevels.ALPHA,
            COMMON_THRESHOLD
          )
      ).to.be.reverted;
      await expect(
        feeController
          .connect(owner)
          .updateBRDGHoldingIncentiveThreshold(
            HoldingLevels.ALPHA,
            COMMON_THRESHOLD.sub(1)
          )
      ).to.be.reverted;
    });
  });

  describe("Token Holding incentive percentage", () => {
    it("Should update the COMMON incentive percentage", async () => {
      await feeController
        .connect(owner)
        .updateTokenHoldingIncentivePercentage(HoldingLevels.COMMON, 4);
      expect(
        (await feeController.tokenHolderIncentive(HoldingLevels.COMMON))
          .incentivePercentage
      ).to.be.equal(4);
    });

    it("Should revert if COMMON incentive percentage is more than ALPHA and BETA incentive percentagr", async () => {
      const BETA_INCENTIVE = (
        await feeController.tokenHolderIncentive(HoldingLevels.BETA)
      ).incentivePercentage;
      const ALPHA_INCENTIVE = (
        await feeController.tokenHolderIncentive(HoldingLevels.ALPHA)
      ).incentivePercentage;
      await expect(
        feeController
          .connect(owner)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.COMMON,
            BETA_INCENTIVE.add(1)
          )
      ).to.be.reverted;
      await expect(
        feeController
          .connect(owner)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.COMMON,
            ALPHA_INCENTIVE.add(1)
          )
      ).to.be.reverted;
    });

    it("Should update the BETA incentive percentage", async () => {
      await feeController
        .connect(owner)
        .updateTokenHoldingIncentivePercentage(HoldingLevels.BETA, 40);
      expect(
        (await feeController.tokenHolderIncentive(HoldingLevels.BETA))
          .incentivePercentage
      ).to.be.equal(40);
    });

    it("Should revert if the BETA incentive percentage is less than or equal to the COMMON incentive percentage", async () => {
      const COMMON_INCENTIVE = (
        await feeController.tokenHolderIncentive(HoldingLevels.COMMON)
      ).incentivePercentage;
      await expect(
        feeController
          .connect(owner)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.BETA,
            COMMON_INCENTIVE
          )
      ).to.be.reverted;
      await expect(
        feeController
          .connect(owner)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.BETA,
            COMMON_INCENTIVE.sub(1)
          )
      ).to.be.reverted;
    });

    it("Should revert if the BETA incentive percentage is more than or equal to the ALPHA incentive percentage", async () => {
      const ALPHA_INCENTIVE = (
        await feeController.tokenHolderIncentive(HoldingLevels.ALPHA)
      ).incentivePercentage;
      await expect(
        feeController
          .connect(owner)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.BETA,
            ALPHA_INCENTIVE
          )
      ).to.be.reverted;
      await expect(
        feeController
          .connect(owner)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.BETA,
            ALPHA_INCENTIVE.add(1)
          )
      ).to.be.reverted;
    });

    it("Should update the ALPHA incentive percentage", async () => {
      const BETA_INCENTIVE = (
        await feeController.tokenHolderIncentive(HoldingLevels.BETA)
      ).incentivePercentage;
      await feeController
        .connect(owner)
        .updateTokenHoldingIncentivePercentage(
          HoldingLevels.ALPHA,
          BETA_INCENTIVE.add(1)
        );
      expect(
        (await feeController.tokenHolderIncentive(HoldingLevels.ALPHA))
          .incentivePercentage
      ).to.be.equal(BETA_INCENTIVE.add(1));
    });

    it("Should revert if the ALPHA incentive percentage is less than or equal to the BETA incentive percentage", async () => {
      const BETA_INCENTIVE = (
        await feeController.tokenHolderIncentive(HoldingLevels.BETA)
      ).incentivePercentage;
      await expect(
        feeController
          .connect(owner)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.ALPHA,
            BETA_INCENTIVE
          )
      ).to.be.reverted;
      await expect(
        feeController
          .connect(owner)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.ALPHA,
            BETA_INCENTIVE.sub(1)
          )
      ).to.be.reverted;
    });

    it("Should revert if the ALPHA incentive percentage is less than or equal to the COMMON incentive percentage", async () => {
      const COMMON_INCENTIVE = (
        await feeController.tokenHolderIncentive(HoldingLevels.COMMON)
      ).incentivePercentage;
      await expect(
        feeController
          .connect(owner)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.ALPHA,
            COMMON_INCENTIVE
          )
      ).to.be.reverted;
      await expect(
        feeController
          .connect(owner)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.ALPHA,
            COMMON_INCENTIVE.sub(1)
          )
      ).to.be.reverted;
    });

    it("Should revert if any address apart from owner and admin tries to update incentive percentage for assets", async () => {
      const BETA_INCENTIVE = (
        await feeController.tokenHolderIncentive(HoldingLevels.BETA)
      ).incentivePercentage;
      const ALPHA_INCENTIVE = (
        await feeController.tokenHolderIncentive(HoldingLevels.ALPHA)
      ).incentivePercentage;
      await expect(
        feeController
          .connect(randomAddress)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.ALPHA,
            BETA_INCENTIVE.add(1)
          )
      ).to.be.revertedWith("caller is not the admin");
      await expect(
        feeController
          .connect(randomAddress)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.BETA,
            ALPHA_INCENTIVE.sub(1)
          )
      ).to.be.revertedWith("caller is not the admin");
      await expect(
        feeController
          .connect(randomAddress)
          .updateTokenHoldingIncentivePercentage(
            HoldingLevels.COMMON,
            BETA_INCENTIVE.sub(1)
          )
      ).to.be.revertedWith("caller is not the admin");
    });
  });

  describe("Indexed Token Incentive", () => {
    it("Should activate token incentive for the assat", async () => {
      await feeController
        .connect(admin)
        .activateIndexedTokenIncentive(asset1.address, true);
      expect(
        (await feeController.indexedTokenIncentive(asset1.address)).isActive
      ).to.be.equal(true);
    });

    it("Should revert if any address apart from owner and admin tries to activate token incentive for assets", async () => {
      await expect(
        feeController
          .connect(randomAddress)
          .activateIndexedTokenIncentive(asset1.address, true)
      ).to.be.revertedWith("caller is not the admin");
    });
  });

  describe("activate Indexed User Incentive", () => {
    it("Should activate user indexed incentive", async () => {
      await feeController
        .connect(admin)
        .activateIndexedUserIncentive(randomAddress.address);

      expect(
        (await feeController.indexedUserIncentive(randomAddress.address))
          .isActive
      ).to.be.equal(true);
    });

    it("Should revert if any address apart from owner and admin tries to activate user incentive", async () => {
      await expect(
        feeController
          .connect(randomAddress)
          .activateIndexedUserIncentive(randomAddress.address)
      ).to.be.revertedWith("caller is not the admin");
    });
  });

  describe("Unactivate Indexed User Incentive", () => {
    it("Should unactivate user indexed incentive", async () => {
      await feeController
        .connect(admin)
        .activateIndexedUserIncentive(randomAddress.address);

      await feeController
        .connect(admin)
        .deActivateIndexedUserIncentive(randomAddress.address);
      expect(
        (await feeController.indexedUserIncentive(randomAddress.address))
          .isActive
      ).to.be.equal(false);
    });

    it("Should revert if any address apart from owner and admin tries to unactivate token incentive", async () => {
      await expect(
        feeController
          .connect(randomAddress)
          .deActivateIndexedUserIncentive(randomAddress.address)
      ).to.be.revertedWith("caller is not the admin");
    });
  });

  describe("getBridgeFee", () => {
    beforeEach(async () => {
      await settings
        .connect(owner)
        .setNetworkSupportedChains(
          [1, 2, 9],
          [parseEther("0.01"), parseEther("0.02"), parseEther("0.09")],
          true
        );

      await settings.connect(owner).setbrgToken(brdgToken.address);
      await brdgToken
        .connect(owner)
        .transfer(assetUser2.address, parseEther("1000"));
    });

    it("Should return 0 if user is exempted and address exemption is activated", async () => {
      await feeController.connect(admin).activateAddressExemption(true);
      await feeController.connect(owner).exemptAddress(assetUser.address, true);
      expect(
        await feeController.getBridgeFee(assetUser.address, asset1.address)
      ).to.be.equal(0);
    });

    it("Should get an incentive if asset holding incentive is active and there is an incentive percentage", async () => {
      await feeController.connect(admin).activateAssetIncentive(true);
      await feeController
        .connect(admin)
        .activateIndexedTokenIncentive(asset1.address, true);
      await settings.connect(owner).enableBaseFee();
      await feeController
        .connect(admin)
        .updateIndexedTokenIncentivePercentage(asset1.address, 10);
      expect(
        await feeController.getBridgeFee(assetUser.address, asset1.address)
      ).to.be.equal(9);
    });

    it("Should get an incentive depending on brdg holding threshold and if bridge holding is active", async () => {
      await feeController.connect(admin).activateBRDGHoldingIncentive(true);
      await settings.connect(owner).enableBaseFee();
      await brdgToken.transfer(assetUser.address, parseEther("50000"));
      await brdgToken.transfer(assetUser2.address, parseEther("10000000"));
      expect(
        await feeController.getBridgeFee(assetUser2.address, asset1.address)
      ).to.be.equal(5);
      expect(
        await feeController.getBridgeFee(assetUser.address, asset1.address)
      ).to.be.equal(8);
    });

    it("Should return the exact fee if there are no incentive", async () => {
      await feeController.connect(admin).activateBRDGHoldingIncentive(true);
      await settings.connect(owner).enableBaseFee();
      expect(
        await feeController.getBridgeFee(assetUser.address, asset1.address)
      ).to.be.equal(10);
    });
  });
});
