const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("settings", function () {
    let contract;
    let HardhatSettingsContract;
    let controller;
    let controllerContract;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    beforeEach(async function () {
        // Get the ContractFactory and Signers here.controllerContrac
        contract = await ethers.getContractFactory("Settings");
        controllerContract = await ethers.getContractFactory("Controller");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    
        controller = await controllerContract.deploy();
        HardhatSettingsContract = await contract.deploy(controller.address , addr2.address);

      });
  it("should deploy settings", async function () {
   expect(await HardhatSettingsContract.controller()).to.equal(controller.address);

  });
  it("should not allow none Admin set approve to add", async function () {
    await expect(
        HardhatSettingsContract.connect(addr1).setApprovedToAdd(addr2.address, "0x1fead0d175a1cb5a1c81713E487374C65Cb93629" , true)
      ).to.be.revertedWith("U_A");
   });
   it("should not allow none owner set MinValidationPercentage", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);

    await expect(
        
        HardhatSettingsContract.connect(addr1).setMinValidationPercentage(80)
      ).to.be.revertedWith("U_A");
   });
   it("should not allow none Admin set minWithdrawableFee", async function () {
    await expect(
        HardhatSettingsContract.connect(addr1).setminWithdrawableFee(100000000)
      ).to.be.revertedWith("U_A");
   });
   it("should not allow none Admin set NetworkSupportedChains", async function () {
    await expect(
        HardhatSettingsContract.connect(addr1).setNetworkSupportedChains([2 , 3] , [100000000 ,100000000] ,true)
      ).to.be.revertedWith("U_A");
   });
//    it("should not add same chain ID as supported chain", async function () {
       
//    await HardhatSettingsContract.connect(owner).setNetworkSupportedChains([313737] , [100000] ,true)
//     expect(
//         await HardhatSettingsContract.connect(owner).isNetworkSupportedChain(313737)
//       ).to.be.false;
//    });
   it("should not allow none Admin update NetworkFee", async function () {
    HardhatSettingsContract.connect(owner).setNetworkSupportedChains([2 , 3] , [100000000 ,100000000] ,true)
    await expect(
        HardhatSettingsContract.connect(addr1).updateNetworkFee(2 , 10000000000)
      ).to.be.revertedWith("U_A");
   });
   it("should not allow none Admin set RailOwnerFeeShare", async function () {
    await expect(
        HardhatSettingsContract.connect(addr1).setRailOwnerFeeShare(40)
      ).to.be.revertedWith("U_A");
   });
   it("should not allow none Admin set UpdatableAssetState", async function () {
    await expect(
        HardhatSettingsContract.connect(addr1).setUpdatableAssetState(true)
      ).to.be.revertedWith("U_A");
   }); 
   it("should not allow none Admin set OnlyOwnableRailState", async function () {
    await expect(
        HardhatSettingsContract.connect(addr1).setOnlyOwnableRailState(true)
      ).to.be.revertedWith("U_A");
   });
   it("should not allow none Admin set railRegistrationFee", async function () {
    await expect(
        HardhatSettingsContract.connect(addr1).setrailRegistrationFee(20)
      ).to.be.revertedWith("U_A");
   });
   it("should not allow none Owner set FeeRemitanceAddress", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);
    await expect(
        HardhatSettingsContract.connect(addr1).setFeeRemitanceAddress(addr2.address)
      ).to.be.revertedWith("U_A");
   });
   
   it("can set ApprovedToAdd by Admin", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);
    await HardhatSettingsContract.connect(addr1).setApprovedToAdd(addr2.address, "0x1fead0d175a1cb5a1c81713E487374C65Cb93629" , true)
    expect(
        await   HardhatSettingsContract.approvedToAdd("0x1fead0d175a1cb5a1c81713E487374C65Cb93629", addr2.address)
       ).to.be.true;
   });
   it("can set MinValidationPercentage by Owner", async function () {
    await HardhatSettingsContract.connect(owner).setMinValidationPercentage(80)
    expect(
        await   HardhatSettingsContract.ValidationPercentage()
       ).to.equal(80);
   });
   
   it("can set brgToken by Admin", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);
    await HardhatSettingsContract.connect(addr1).setbrgToken("0x1fead0d175a1cb5a1c81713E487374C65Cb93629")
    expect(
        await   HardhatSettingsContract.brgToken()
       ).to.equal("0x1fead0d175a1cb5a1c81713E487374C65Cb93629");
   });
   it("can set minWithdrawableFee by Admin", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);
    await HardhatSettingsContract.connect(addr1).setminWithdrawableFee(30)
    expect(
        await   HardhatSettingsContract.minWithdrawableFee()
       ).to.equal(30);
   });
   it("can set NetworkSupportedChains by Admin", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);
    await HardhatSettingsContract.connect(addr1).setNetworkSupportedChains([1] , [10] , true)
    expect(
        await   HardhatSettingsContract.isNetworkSupportedChain(1)
       ).to.be.true;
   });
   it("can update NetworkFee by Admin", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);
    await HardhatSettingsContract.connect(addr1).setNetworkSupportedChains([1] , [10] , true)
    await HardhatSettingsContract.connect(addr1).updateNetworkFee(1, 3000)
    expect(
        await   HardhatSettingsContract.networkFee(1)
       ).to.equal(3000);
   });
   
   it("can set RailOwnerFeeShare by Admin", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);
    await HardhatSettingsContract.connect(addr1).setRailOwnerFeeShare(30)
    expect(
        await   HardhatSettingsContract.railOwnerFeeShare()
       ).to.equal(30);
   });
   
   it("can set UpdatableAssetState by Admin", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);
    await HardhatSettingsContract.connect(addr1).setUpdatableAssetState(false)
    expect(
        await   HardhatSettingsContract.updatableAssetState()
       ).to.be.false;
   });
   it("can set OnlyOwnableRailState by Admin", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);
    await HardhatSettingsContract.connect(addr1).setOnlyOwnableRailState(false)
    expect(
        await   HardhatSettingsContract.onlyOwnableRail()
       ).to.be.false;
   });
   
   it("can set railRegistrationFee by Admin", async function () {
    await controller.connect(owner).addAdmin(addr1.address ,true);
    await HardhatSettingsContract.connect(addr1).setrailRegistrationFee(30)
    expect(
        await   HardhatSettingsContract.railRegistrationFee()
       ).to.equal(30);
   });
//    it("can set railRegistrationFee by Owner", async function () {
//     await HardhatSettingsContract.connect(owner).setFeeRemitanceAddress(addr.address)
//     expect(
//         await   HardhatSettingsContract.feeRemitance()
//        ).to.equal(addr2.address);
//    });
   
   
});