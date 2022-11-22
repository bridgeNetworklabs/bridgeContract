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
        .activateBrgHoldingIncentive(true);
      expect(await feeController.usebrgHoldingIncentive()).to.be.true;
      expect(tx)
        .emit(feeController, "BrgHoldingIncentiveStatusChanged")
        .withArgs(true);
    });

    it("Should deactivate bridge holding incentive ", async () => {
      await feeController.connect(admin).activateBrgHoldingIncentive(true);
      const tx = await feeController
        .connect(admin)
        .activateBrgHoldingIncentive(false);
      expect(await feeController.usebrgHoldingIncentive()).to.be.false;
      expect(tx)
        .emit(feeController, "BrgHoldingIncentiveStatusChanged")
        .withArgs(false);
    });

    it("Should revert if random address tries to active bridge holding incentive ", async () => {
      await expect(
        feeController.connect(randomAddress).activateBrgHoldingIncentive(true)
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

  describe("Asset incentivization", () => {
    it("Should set an asset incentivization", async () => {
      const tx = await feeController
        .connect(owner)
        .setAssetIncentivization(asset1.address, 40);
      expect(await feeController.assetIncentive(asset1.address)).to.be.equal(
        40
      );
      expect(tx)
        .emit(feeController, "AssetIncentiveUpdated")
        .withArgs(assetUser.address, true);
    });

    it("Asset incentivization should not be more than 100", async () => {
      await expect(
        feeController.connect(owner).setAssetIncentivization(asset1.address, 90)
      ).to.be.revertedWith("above limit");
    });

    it("Should revert if any address apart from owner tries to set asset incentivization", async () => {
      await expect(
        feeController
          .connect(randomAddress)
          .setAssetIncentivization(asset1.address, 90)
      ).to.be.revertedWith("caller is not the owner");
    });
  });

  describe("Bridge Holding Threshold", () => {
    it("Should change bridge holding incentive threshold", async () => {
      const tx = await feeController.connect(owner).setBrgHoldingThreshold(40);
      expect(await feeController.brgHoldingThreshold()).to.be.equal(40);
      expect(tx)
        .emit(feeController, "BrgHoldingThresholdUpdated")
        .withArgs(0, 40);
    });

    it("Should revert if not owner changing bridge holding incentive threshold", async () => {
      await expect(
        feeController.connect(randomAddress).setBrgHoldingThreshold(50)
      ).to.be.revertedWith("caller is not the owner");
    });
  });

  describe("Bridge Holding Incentive", () => {
    it("Should change bridge holding incentive", async () => {
      const tx = await feeController.connect(owner).setBrgHoldingIncentive(40);
      expect(await feeController.brgHoldingIncentive()).to.be.equal(40);
      expect(tx)
        .emit(feeController, "BrgHoldingIncentiveUpdated")
        .withArgs(20, 40);
    });

    it("Should revert if bridge holding incentive is not less 100", async () => {
      await expect(
        feeController.connect(owner).setBrgHoldingIncentive(100)
      ).to.be.revertedWith("above limit");
    });

    it("Should revert if not owner changing bridge holding incentive incentive", async () => {
      await expect(
        feeController.connect(randomAddress).setBrgHoldingIncentive(50)
      ).to.be.revertedWith("caller is not the owner");
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
        await feeController
          .connect(owner)
          .exemptAddress(assetUser.address, true);
        expect(
          await feeController.getBridgeFee(assetUser.address, asset1.address, 9)
        ).to.be.equal(0);
      });

      it("Should get an incentive if asset holding incentive is active", async () => {
        await feeController.connect(owner).activateAssetIncentive(true);
        await feeController
          .connect(owner)
          .setAssetIncentivization(asset1.address, 50);
        expect(
          await feeController.getBridgeFee(
            assetUser2.address,
            asset1.address,
            9
          )
        ).to.be.equal(parseEther("0.045"));
      });

      it("Should get an incentive if user has more than brdg holding threshold and if bridge holding is active", async () => {
        await feeController.connect(owner).activateBrgHoldingIncentive(true);
        await feeController
          .connect(owner)
          .setBrgHoldingThreshold(parseEther("80"));
        expect(
          await feeController.getBridgeFee(
            assetUser2.address,
            asset1.address,
            9
          )
        ).to.be.equal(parseEther("0.072"));
      });

      it("Should return the exact fee if there are no incentive", async () => {
        expect(
          await feeController.getBridgeFee(
            assetUser2.address,
            asset1.address,
            9
          )
        ).to.be.equal(parseEther("0.09"));
      });
    });
  });
});
