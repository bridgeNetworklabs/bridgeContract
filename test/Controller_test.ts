import { ethers } from "hardhat";
import type { Controller } from "../typechain-types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";

describe("Controller", () => {
  let controller: Controller;
  let owner: SignerWithAddress;
  let admin: SignerWithAddress;
  let admin2: SignerWithAddress;
  let oracle: SignerWithAddress;
  let oracle2: SignerWithAddress;
  let randomAddress: SignerWithAddress;
  let registrar: SignerWithAddress;
  let validator: SignerWithAddress;
  let registrar2: SignerWithAddress;
  let validator2: SignerWithAddress;

  before(async () => {
    [
      owner,
      admin,
      oracle,
      randomAddress,
      registrar,
      validator,
      admin2,
      oracle2,
      registrar2,
      validator2,
    ] = await ethers.getSigners();
    const controllerContract = await ethers.getContractFactory("Controller");
    controller = await controllerContract.connect(owner).deploy();
  });

  describe("Owner Function", () => {
    it("Owner should be the the person who deployed the contract", async () => {
      expect(await controller.owner()).to.be.equal(owner.address);
    });

    it("Only owner can add and remove admin", async () => {
      await controller.connect(owner).addAdmin(admin.address, true);
      expect(await controller.isAdmin(admin.address)).to.be.true;
      await controller.connect(owner).addAdmin(admin.address, false);
      expect(await controller.isAdmin(admin.address)).to.be.false;
    });

    it("Should fail if a randomAddress tries to add or remove admin", async () => {
      await expect(
        controller.connect(randomAddress).addAdmin(admin.address, true)
      ).to.be.revertedWith("Ownable: caller is not the owner");
      await controller.connect(owner).addAdmin(admin.address, true);
      await expect(
        controller.connect(randomAddress).addAdmin(admin.address, false)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should throw error when trying to re-add an already existing admin", async function () {
      await expect(
        controller.connect(owner).addAdmin(admin.address, true)
      ).to.revertedWith("already an admin");
    });
  });

  describe("Admin Function", () => {
    it("Only Admin can add and remove registrar", async () => {
      await controller.connect(admin).addRegistrar(registrar.address, true);
      expect(await controller.isRegistrar(registrar.address)).to.be.true;
      await controller.connect(admin).addRegistrar(registrar.address, false);
      expect(await controller.isRegistrar(registrar.address)).to.be.false;
    });

    it("Should fail if a randomAddress tries to add or remove registrar", async () => {
      await expect(
        controller.connect(randomAddress).addRegistrar(registrar.address, true)
      ).to.be.revertedWith("U_A");
      await controller.connect(admin).addRegistrar(registrar.address, true);
      await expect(
        controller.connect(randomAddress).addRegistrar(registrar.address, false)
      ).to.be.revertedWith("U_A");
    });

    it("Only Admin can add and remove oracle", async () => {
      await controller.connect(admin).addOracle(oracle.address, true);
      expect(await controller.isOracle(oracle.address)).to.be.true;
      await controller.connect(admin).addOracle(oracle.address, false);
      expect(await controller.isOracle(oracle.address)).to.be.false;
    });

    it("Should fail if a randomAddress tries to add or remove Oracle", async () => {
      await expect(
        controller.connect(randomAddress).addOracle(oracle.address, true)
      ).to.be.revertedWith("U_A");
      await controller.connect(admin).addOracle(oracle.address, true);
      await expect(
        controller.connect(randomAddress).addOracle(oracle.address, false)
      ).to.be.revertedWith("U_A");
    });

    it("Only Admin can add and remove Validator", async () => {
      await controller.connect(admin).addValidator(validator.address, true);
      expect(await controller.isValidator(validator.address)).to.be.true;
      await controller.connect(admin).addValidator(validator.address, false);
      expect(await controller.isValidator(validator.address)).to.be.false;
    });

    it("Should fail if a randomAddress tries to add or remove Validator", async () => {
      await expect(
        controller.connect(randomAddress).addValidator(validator.address, true)
      ).to.be.revertedWith("U_A");
      await controller.connect(admin).addValidator(validator.address, true);
      await expect(
        controller.connect(randomAddress).addValidator(validator.address, false)
      ).to.be.revertedWith("U_A");
    });

    it("Should throw error when trying to re-add an already existing registrar", async function () {
      await expect(
        controller.connect(admin).addRegistrar(registrar.address, true)
      ).to.revertedWith("already a Registrer");
    });

    it("Should throw error when trying to re-add an already existing oracle", async function () {
      await expect(
        controller.connect(admin).addOracle(oracle.address, true)
      ).to.revertedWith("already an oracle");
    });

    it("Should throw error when trying to re-add an already existing validator", async function () {
      await expect(
        controller.connect(admin).addValidator(validator.address, true)
      ).to.revertedWith("already a Validator");
    });
  });

  describe("View Function", () => {
    it("Should return the number of Admin", async () => {
      expect(await controller.adminsCount()).to.be.equal(2);
    });

    it("Should return the number of Validator", async () => {
      expect(await controller.validatorsCount()).to.be.equal(1);
    });

    it("Should return the number of Validator", async () => {
      expect(await controller.registrarsCount()).to.be.equal(1);
    });

    it("Should return the number of Oracle", async () => {
      expect(await controller.oraclesCount()).to.be.equal(1);
    });
  });

  describe("Events", () => {
    it("should emit event when admin is removed or added", async function () {
      await expect(controller.connect(owner).addAdmin(admin2.address, true))
        .to.emit(controller, "AdminAdded")
        .withArgs(admin2.address);

      await expect(controller.connect(owner).addAdmin(admin2.address, false))
        .to.emit(controller, "AdminRemoved")
        .withArgs(admin2.address);
    });

    it("should emit event when oracle is removed or added", async function () {
      await expect(controller.connect(admin).addOracle(oracle2.address, true))
        .to.emit(controller, "OracleAdded")
        .withArgs(oracle2.address);

      await expect(controller.connect(admin).addOracle(oracle2.address, false))
        .to.emit(controller, "OracleRemoved")
        .withArgs(oracle2.address);
    });

    it("should emit event when registrar is removed or added", async function () {
      await expect(
        controller.connect(admin).addRegistrar(registrar2.address, true)
      )
        .to.emit(controller, "RegistrarAdded")
        .withArgs(registrar2.address);

      await expect(
        controller.connect(owner).addRegistrar(registrar2.address, false)
      )
        .to.emit(controller, "RegistrarRemoved")
        .withArgs(registrar2.address);
    });

    it("should emit event when validator is removed or added", async function () {
      await expect(
        controller.connect(admin).addValidator(validator2.address, true)
      )
        .to.emit(controller, "ValidatorAdded")
        .withArgs(validator2.address);

      await expect(
        controller.connect(owner).addValidator(validator2.address, false)
      )
        .to.emit(controller, "ValidatorRemoved")
        .withArgs(validator2.address);
    });
  });
});
