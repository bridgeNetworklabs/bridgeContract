const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("bridge", function () {
 
    let controllerContract;   
    let controller;   
    let settingsContract;   
    let settings; 
    let feeControllerContract;   
    let feeController;
    let deployerContract;   
    let deployer;
    let registryContract;   
    let registry;
    let bridgeContract;   
    let bridge;
    let newBridge;
    let brgTokenContract;
    let brgToken;
    let zeroAddress = "0x0000000000000000000000000000000000000000"
    let owner;
    let admin;
    let registrar;
    let oracle;
    let validator1;
    let validator2;
    let validator3;
    let validator4;
    let validator5;

    let feeRemitance;
    let assetManager;
    let assetFeeRemitance;


    beforeEach(async function () {
        [owner, admin,registrar, oracle,validator1 ,validator2,validator3,validator4,validator5 ,feeRemitance,assetManager , assetFeeRemitance] = await ethers.getSigners();
        controllerContract = await ethers.getContractFactory("Controller");
        controller = await controllerContract.deploy();
        admin
        await controller.connect(owner).addAdmin(admin.address ,true);
        await controller.connect(owner).addRegistrar(registrar.address ,true);
        await controller.connect(owner).addOracle(oracle.address ,true);
        await controller.connect(owner).addValidator(validator1.address ,true);
        await controller.connect(owner).addValidator(validator2.address ,true);
        await controller.connect(owner).addValidator(validator3.address ,true);
        await controller.connect(owner).addValidator(validator4.address ,true);
        await controller.connect(owner).addValidator(validator5.address ,true);

        settingsContract = await ethers.getContractFactory("Settings");
        settings = await settingsContract.deploy(controller.address , feeRemitance.address);

        feeControllerContract = await ethers.getContractFactory("FeeController");
        feeController = await feeControllerContract.deploy(controller.address , settings.address);

        deployerContract = await ethers.getContractFactory("Deployer");
        deployer = await deployerContract.deploy(controller.address );

        brgTokenContract = await ethers.getContractFactory("Token");
        brgToken = await brgTokenContract.deploy("bridge Token" , "BRG");

        registryContract = await ethers.getContractFactory("Registry");
        registry = await registryContract.deploy();

        BridgePoolContract = await ethers.getContractFactory("BridgePool");
        BridgePool = await BridgePoolContract.deploy(controller.address);

        bridgeContract = await ethers.getContractFactory("Bridge");
        bridge = await bridgeContract.deploy(
             controller.address,
             settings.address,
             registry.address,
             deployer.address,
             feeController.address,
             BridgePool.address,
             zeroAddress
        );
        
        newBridge = await bridgeContract.deploy(
             controller.address,
             settings.address,
             registry.address,
             deployer.address,
             feeController.address,
             BridgePool.address,
             bridge.address
        );
    
        

        await registry.connect(owner).transferOwnership(bridge.address);
        await settings.connect(owner).setbrgToken(brgToken.address);
        await deployer.connect(owner).udpadateBridge(bridge.address);
        await BridgePool.connect(owner).initializePool(bridge.address);
        

      });
    
      it("should deploy all bridging contract", async function () {
        expect(await bridge.controller()).to.equal(controller.address);
       });
       it("should be able reigister Rail by Admin", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        
        await bridge.connect(admin).registerRail(
          zeroAddress , 
            "100000000000000000000",
            "10000000000000000000000",
            [2] ,
            [zeroAddress] ,
            false,
            assetFeeRemitance.address, 
            assetManager.address,
            2) 
            let asset = await bridge.nativeAssets(zeroAddress)
            // console.log(asset[9])
        expect(asset[9]).to.be.true;
       });

       it("should be able reigister Rail by Asset Owner", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("Token");
        token = await tokenContract.connect(assetManager).deploy("Token" , "tkn");
        console.log(await token.owner())
        console.log(token.address)
        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2)  
            let asset = await bridge.nativeAssets(token.address)
            console.log(asset[9])
            await  expect( asset[9]).to.be.true;
       });
       it("should be able reigister Rail by User Approved Add", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("Token");
        token = await tokenContract.deploy("Token" , "tkn");
       
       await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)
      
        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2)  
            let asset = await bridge.nativeAssets(token.address)
            
        expect(asset[9]).to.be.true;
       });

       it("should allow manager update asset", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("Token");
        token = await tokenContract.deploy("Token" , "tkn");
       
       await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)
      
        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2)  
          
         

         expect(await bridge.connect(assetManager).updateAsset(token.address  , assetManager.address, assetManager.address  ,  "100000000000000000000" ,"10000000000000000000000")).to.not.throw;
       });
       it("should be able to update asset", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("Token");
        token = await tokenContract.deploy("Token" , "tkn");
       
       await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)
      
        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2)  
          
         
          await bridge.connect(assetManager).updateAsset(token.address  , assetManager.address, assetManager.address  ,  "1000000000000000000000" ,"10000000000000000000000")
          
          asset = await bridge.connect(assetManager).nativeAssets(token.address)
         await expect(asset[1]).to.equal("1000000000000000000000");
       });
       it("should allow owner update asset", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("Token");
        token = await tokenContract.deploy("Token" , "tkn");
       
       await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)
      
        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2)  
          
         

         expect(await bridge.connect(owner).updateAsset(token.address  , assetManager.address, assetManager.address  ,  "100000000000000000000" ,"10000000000000000000000")).to.not.throw;
       });

      

       it("should not  allow none manager/owner update asset", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("Token");
        token = await tokenContract.deploy("Token" , "tkn");
       
       await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)
      
        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2)  
          
         

         await expect (
           bridge.connect(admin).updateAsset(token.address  , assetManager.address, assetManager.address  ,  "100000000000000000000" ,"10000000000000000000000")
          ).to.revertedWith("U_A")
       });
      //  it("should not  be able reigister Rail by User who is not Admin/Owner/Approved", async function () {
       
      //   await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
      //   await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
      //   await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
      //   tokenContract = await ethers.getContractFactory("Token");
      //   token = await tokenContract.deploy("Token" , "tkn");
      //  expect(   await bridge.connect(assetManager).registerRail(token.address , 
      //     "100000000000000000000",
      //     "10000000000000000000000",
      //     [2] ,
      //     [zeroAddress] ,
      //     false,
      //     assetFeeRemitance.address, 
      //     assetManager.address,
      //     2)   
      //       );
      //  });
       it("should not  be able Bridge token without approval asset/Fees ", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , ["10000000000000000000"] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("Token");
        token = await tokenContract.deploy("Token" , "tkn");
        await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)

        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2) 
        
        await bridge.connect(admin).activeNativeAsset(token.address , true);

        await expect (
            bridge.connect(owner).send( 2,token.address , "100000000000000000000", owner.address )).to.revertedWith("I_F")
       

      
       });
       it("should  be able toBridge coin", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , [0] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("TetherToken");
        token = await tokenContract.deploy("1000000000000000" , "Token" , "tkn" , 6);
        await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)
        // await settings.connect(owner).enableBaseFee()
        
        await bridge.connect(owner).registerRail(zeroAddress , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          ["0xbf07d7C2613188E3b403D9fbdca7872D0ff1e5aF"] ,
          true,
          assetFeeRemitance.address, 
          assetManager.address,
          2) 
       
        // let fees = await ethers.utils.parseEther(val)
        await bridge.connect(admin).activeNativeAsset(zeroAddress , true );
        // await token.connect(owner).approve(bridge.address, "1000000000000000000000")
        let val = await feeController.getBridgeFee(owner.address, token.address, 2)
        let transactionID = await registry.getID( bridge.chainId(), 2, zeroAddress ,  "100000000000000000000",  owner.address , registry.getUserNonce(owner.address))
        console.log(await bridge.connect(owner).send( 2,zeroAddress , "100000000000000000000", owner.address ,{value : "100000000000000000000" }))
        
         expect (await registry.isSendTransaction(transactionID)).to.be.true
       
       });
       it("should  be able Bridge token", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , ["10000000000000000000"] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("TetherToken");
        token = await tokenContract.deploy("1000000000000000" , "Token" , "tkn" , 6);
        await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)
        // await settings.connect(owner).enableBaseFee()
        
        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000",
          "1000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2) 
       
        // let fees = await ethers.utils.parseEther(val)
        await bridge.connect(admin).activeNativeAsset(token.address , true );
        await token.connect(owner).approve(bridge.address, "1000000000")
        let val = await feeController.getBridgeFee(owner.address, token.address, 2)
        let transactionID = await registry.getID( bridge.chainId(), 2, token.address ,  "1000000000000000000000",  owner.address , registry.getUserNonce(owner.address))
        console.log(transactionID)
        console.log(await bridge.connect(owner).send( 2,token.address , "1000000000", owner.address ,{value : val }))
        
         expect (await registry.isSendTransaction(transactionID)).to.be.true
       
       });
       it("should  be able Bridge tokenn With any decimals", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , ["10000000000000000000"] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("TestToken");
        token = await tokenContract.deploy("Token" , "tkn" ,6);
        await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)
        await settings.connect(owner).enableBaseFee()
        
        await bridge.connect(assetManager).registerRail(token.address , 
          "1000000",
          "1000000000000",
          [2] ,
          [zeroAddress],
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2) 
       
        // let fees = await ethers.utils.parseEther(val)
        await bridge.connect(admin).activeNativeAsset(token.address , true );
        await token.connect(owner).approve(bridge.address, "1000000000")
        let val = await feeController.getBridgeFee(owner.address, token.address, 2)
        let transactionID = await registry.getID( bridge.chainId(), 2, token.address ,  "999000000000000000000",  owner.address , registry.getUserNonce(owner.address))
        console.log(await bridge.connect(owner).send( 2,token.address , "1000000000", owner.address ,{value : val }))
        
         expect (await registry.isSendTransaction(transactionID)).to.be.true
       
       });
       it("should  be able validate DirectSwap token With any decimals", async function () {
       
        await settings.connect(owner).setNetworkSupportedChains([2] , ["10000000000000000000"] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("TestToken");
        token = await tokenContract.deploy("Token" , "tkn" ,6);
        await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)
        await settings.connect(owner).enableBaseFee()
        
        await bridge.connect(assetManager).registerRail(
          token.address , 
          "1000000",
          "1000000000000",
          [2] ,
          ["0x55d398326f99059fF775485246999027B3197955"],
          true,
          assetFeeRemitance.address, 
          assetManager.address,
          2) 
        
          await bridge.connect(admin).addForiegnAsset(
            "0x55d398326f99059fF775485246999027B3197955",
            2,
            ['1000000' , '1000000'],
            ['w' ,'w'],
            true,
            assetManager.address,
            assetFeeRemitance.address,
            3,
            true,
            token.address
         ) 
        // let fees = await ethers.utils.parseEther(val)
        await bridge.connect(admin).activeNativeAsset(token.address , true );
        await token.connect(owner).approve(bridge.address, "1000000000")
        let val = await feeController.getBridgeFee(owner.address, token.address, 2)
        console.log(await bridge.connect(owner).send( 2,token.address , "1000000000", owner.address ,{value : val }))
        
        let mintID = await registry.getID( 2, bridge.chainId(), "0x55d398326f99059fF775485246999027B3197955"  ,  "100000000000000000000",  assetManager.address , 0)
        await registry.connect(oracle).registerMintTransaction(mintID ,2, "0x55d398326f99059fF775485246999027B3197955" , "100000000000000000000" , assetManager.address  , 0)

        let transaction = await registry.mintTransactions(mintID)
       
       
        let signatures = [];
        let id = await bridge.chainId();
        let message = await registry.getID( id.toString(),transaction[0] , transaction[1] , transaction[2],  transaction[3],transaction[4])
        signatures[0] = await validator1.signMessage(await ethers.utils.arrayify(message))
        signatures[1] = await validator2.signMessage(await ethers.utils.arrayify(message))
        signatures[2] = await validator3.signMessage(await ethers.utils.arrayify(message))
        signatures[3] = await validator4.signMessage(await ethers.utils.arrayify(message))
        signatures[4] = await validator5.signMessage(await ethers.utils.arrayify(message))
     
        await registry.connect(validator3).validateTransaction(mintID , signatures ,true)
        
        let balance = await token.balanceOf(assetManager.address)
        console.log(balance)
        await expect(balance).to.equal("100000000");
        
        
       
       });
       it("should allow  Owner Pause Bridge", async function () {
         expect( await bridge.connect(owner).pauseBrigde() 
            ).to.not.throw;
       });
       it("should not allow none  Owner Pause Bridge", async function () {
        await expect(  bridge.connect(assetManager).pauseBrigde() 
        ).to.revertedWith("U_A");
      });
     

      it("should be able to register  claim transaction", async function () {
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("Token");
        token = await tokenContract.connect(assetManager).deploy("Token" , "tkn");
     
        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2) 
        let claimID = await registry.getID( 2, bridge.chainId(), token.address ,  "100000000000000000000",  owner.address , 0)
        expect(await registry.connect(oracle).registerClaimTransaction(claimID ,2, token.address, "100000000000000000000",  owner.address , 0)).to.not.throw;
        
      });
      it("should not be able to validate transaction transaction with value overFlow between Chains", async function () {
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("Token");
        token = await tokenContract.connect(assetManager).deploy("Token" , "tkn");
     
        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2) 
        let claimID = await registry.getID( 2, bridge.chainId(), token.address ,  "100000000000000000000",  owner.address , 0)
        await registry.connect(oracle).registerClaimTransaction(claimID ,2, token.address, "100000000000000000000",  owner.address , 0)

        let signatures = [];
        let message = await registry.getID( bridge.chainId(),2, token.address ,  "100000000000000000000",  owner.address , 0)
        signatures[0] = await validator1.signMessage(message)
        signatures[1] = await validator2.signMessage(message)
        signatures[2] = await validator3.signMessage(message)
        signatures[3] = await validator4.signMessage(message)
        signatures[4] = await validator5.signMessage(message)
       
        await expect( registry.connect(validator1).validateTransaction(claimID , signatures ,false)).to.revertedWith("Amount_limit_Err");



        
      });
      it("should not be able to validate with less validators ", async function () {
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("Token");
        token = await tokenContract.connect(assetManager).deploy("Token" , "tkn");
     
        await bridge.connect(assetManager).registerRail(token.address , 
          "100000000000000000000",
          "10000000000000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2)  

         // let fees = await ethers.utils.parseEther(val)
         await bridge.connect(admin).activeNativeAsset(token.address , true );
         await token.connect(assetManager).approve(bridge.address, "100000000000000000000")
         let val = await feeController.getBridgeFee(assetManager.address, token.address, 2 )
         
        await bridge.connect(assetManager).send( 2,token.address , "100000000000000000000", owner.address ,{value : val })

        let claimID = await registry.getID( 2, bridge.chainId(), token.address ,  "100000000000000000000",  owner.address , 0)
        await registry.connect(oracle).registerClaimTransaction(claimID ,2, token.address, "100000000000000000000",  owner.address , 0)
        let transaction = await registry.claimTransactions(claimID)
        let signatures = [];
        let id = await bridge.chainId();
        let message = await registry.getID( id.toString(),transaction[0] , transaction[1] , transaction[2],  transaction[3],transaction[4])
       
        signatures[0] = await validator1.signMessage(await ethers.utils.arrayify(message))
        signatures[1] = await validator1.signMessage(await ethers.utils.arrayify(message))
        signatures[2] = await validator1.signMessage(await ethers.utils.arrayify(message))
        signatures[3] = await validator1.signMessage(await ethers.utils.arrayify(message))
        signatures[4] = await validator1.signMessage(await ethers.utils.arrayify(message))
      
        await expect( registry.connect(validator3).validateTransaction(claimID , signatures ,false)).to.revertedWith("insuficient_signers");
        
      });
      it("should  be able to validate transaction transaction ", async function () {
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("TestToken");
        token = await tokenContract.connect(assetManager).deploy("Token" , "tkn" , 6);
     
        await bridge.connect(assetManager).registerRail(token.address , 
          "1000000",
          "1000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2) 

         // let fees = await ethers.utils.parseEther(val)
         await bridge.connect(admin).activeNativeAsset(token.address , true );
         await token.connect(assetManager).approve(bridge.address, "1000000000")
         let val = await feeController.getBridgeFee(assetManager.address, token.address, 2 )
         
        await bridge.connect(assetManager).send( 2,token.address , "1000000000", owner.address ,{value : val })

        let claimID = await registry.getID( 2, bridge.chainId(), token.address ,  "1000000000000000000000",  owner.address , 0)
        await registry.connect(oracle).registerClaimTransaction(claimID ,2, token.address, "1000000000000000000000",  owner.address , 0)
        let transaction = await registry.claimTransactions(claimID)
       
        let signatures = [];
        let id = await bridge.chainId();
        let message = await registry.getID( id.toString(),transaction[0] , transaction[1] , transaction[2],  transaction[3],transaction[4])
        signatures[0] = await validator1.signMessage(await ethers.utils.arrayify(message))
        signatures[1] = await validator2.signMessage(await ethers.utils.arrayify(message))
        signatures[2] = await validator3.signMessage(await ethers.utils.arrayify(message))
        signatures[3] = await validator4.signMessage(await ethers.utils.arrayify(message))
        signatures[4] = await validator5.signMessage(await ethers.utils.arrayify(message))
     

        await expect(registry.connect(validator3).validateTransaction(claimID , signatures ,false)).to.not.throw;
        
      });
      it("should  be able to validate transaction transaction and send correctValue ", async function () {
        await settings.connect(owner).setNetworkSupportedChains([2] , [10] , true)
        await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
        await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
        tokenContract = await ethers.getContractFactory("TestToken");
        token = await tokenContract.connect(assetManager).deploy("Token" , "tkn" , 6);
     
        await bridge.connect(assetManager).registerRail(token.address , 
          "1000000",
          "1000000000000",
          [2] ,
          [zeroAddress] ,
          false,
          assetFeeRemitance.address, 
          assetManager.address,
          2) 

         // let fees = await ethers.utils.parseEther(val)
         await bridge.connect(admin).activeNativeAsset(token.address , true );
         await token.connect(assetManager).approve(bridge.address, "1000000000")
         let val = await feeController.getBridgeFee(assetManager.address, token.address, 2 )
         
        await bridge.connect(assetManager).send( 2,token.address , "1000000000", owner.address ,{value : val })

        let claimID = await registry.getID( 2, bridge.chainId(), token.address ,  "1000000000000000000000",  owner.address , 0)
        await registry.connect(oracle).registerClaimTransaction(claimID ,2, token.address, "1000000000000000000000",  owner.address , 0)
        let transaction = await registry.claimTransactions(claimID)
       
        let signatures = [];
        let id = await bridge.chainId();
        let message = await registry.getID( id.toString(),transaction[0] , transaction[1] , transaction[2],  transaction[3],transaction[4])
        signatures[0] = await validator1.signMessage(await ethers.utils.arrayify(message))
        signatures[1] = await validator2.signMessage(await ethers.utils.arrayify(message))
        signatures[2] = await validator3.signMessage(await ethers.utils.arrayify(message))
        signatures[3] = await validator4.signMessage(await ethers.utils.arrayify(message))
        signatures[4] = await validator5.signMessage(await ethers.utils.arrayify(message))
     
        await registry.connect(validator3).validateTransaction(claimID , signatures ,false)
        
        let balance = await token.balanceOf(owner.address)
        console.log(balance)
        await expect(balance).to.equal("1000000000");

        
      });
      it("should be able to register foriegn asset", async function () {
        await settings.connect(owner).setNetworkSupportedChains([2] , ["10000000000000000000"] , true)
        console.log(await settings.isNetworkSupportedChain(2))
         expect(  await bridge.connect(registrar).addForiegnAsset(zeroAddress , 2 , ["100000000000000000000", "10000000000000000000000"],["test" , "test"] , true , assetManager.address, assetFeeRemitance.address , 1 , false , zeroAddress) 
        ).to.not.throw;

      });
      it("should be able to mint Transaction", async function () {
        await settings.connect(owner).setNetworkSupportedChains([2] , ["10000000000000000000"] , true)
        console.log(await settings.isNetworkSupportedChain(2))
        await bridge.connect(registrar).addForiegnAsset(zeroAddress , 2 , ["100000000000000000000", "10000000000000000000000"],["test" , "test"] , true , assetManager.address, assetFeeRemitance.address , 1 , false , zeroAddress) 
        console.log(await bridge.wrappedForiegnPair(zeroAddress ,2))
        let mintID = await registry.getID( 2, bridge.chainId(), zeroAddress ,  "100000000000000000000",  owner.address , 0)
        expect(await registry.connect(oracle).registerMintTransaction(mintID ,2,zeroAddress, "100000000000000000000" ,  owner.address , 0)).to.not.throw;

      });
      it("should be able to validate mint Transaction", async function () {
        await settings.connect(owner).setNetworkSupportedChains([2] , ["10000000000000000000"] , true)
        console.log(await settings.isNetworkSupportedChain(2))
        await bridge.connect(registrar).addForiegnAsset(zeroAddress , 2 , ["100000000000000000000", "10000000000000000000000"],["test" , "test"] , true , assetManager.address, assetFeeRemitance.address , 1 , false , zeroAddress) 
        let wrapped = await bridge.wrappedForiegnPair(zeroAddress , 2)
        console.log(wrapped)
        let mintID = await registry.getID( 2, bridge.chainId(), zeroAddress ,  "100000000000000000000",  owner.address , 0)
        await registry.connect(oracle).registerMintTransaction(mintID ,2,zeroAddress, "100000000000000000000" ,  owner.address , 0)

        let transaction = await registry.mintTransactions(mintID)
       
        let signatures = [];
        let id = await bridge.chainId();
        let message = await registry.getID( id.toString(),transaction[0] , transaction[1] , transaction[2],  transaction[3],transaction[4])
      
        
        signatures[0] = await validator1.signMessage(await ethers.utils.arrayify(message))
        signatures[1] = await validator2.signMessage(await ethers.utils.arrayify(message))
        signatures[2] = await validator3.signMessage(await ethers.utils.arrayify(message))
        signatures[3] = await validator4.signMessage(await ethers.utils.arrayify(message))
        signatures[4] = await validator5.signMessage(await ethers.utils.arrayify(message))
   
        await registry.connect(validator3).validateTransaction(mintID , signatures ,true)
        

        let wrappedAddress = await bridge.wrappedForiegnPair(zeroAddress , 2)
        console.log(wrappedAddress)
        let wrappedToken =  await ethers.getContractAt('WrappedToken',wrappedAddress , owner);
        let balance =await wrappedToken.balanceOf(owner.address)
        console.log(balance)
        await expect(balance).to.equal("100000000000000000000");
      });

      // it("should migrate to new bridge", async function () {
       
      //   await settings.connect(owner).setNetworkSupportedChains([2] , ["10000000000000000000"] , true)
      //   await brgToken.connect(owner).transfer(assetManager.address, settings.railRegistrationFee())
      //   await brgToken.connect(assetManager).approve(bridge.address, settings.railRegistrationFee())
      //   tokenContract = await ethers.getContractFactory("Token");
      //   token = await tokenContract.deploy("Token" , "tkn");
      //   await settings.connect(admin).setApprovedToAdd(assetManager.address, token.address , true)

      //   await bridge.connect(assetManager).registerRail(token.address , 
      //     "100000000000000000000",
      //     "10000000000000000000000",
      //     [2] ,
      //     [zeroAddress] ,
      //     false,
      //     assetFeeRemitance.address, 
      //     assetManager.address,
      //     2) 
       
      //   // let fees = await ethers.utils.parseEther(val)
      //   await bridge.connect(admin).activeNativeAsset(token.address , true );

      //   await token.connect(owner).approve(bridge.address, "100000000000000000000")
      //   let val = await feeController.getBridgeFee(owner.address, token.address, 2 )
      //  let transactionID = await registry.getID( bridge.chainId(), 2, token.address ,  "100000000000000000000",  owner.address , registry.getUserNonce(owner.address))
      //  await bridge.connect(owner).send( 2,token.address , "100000000000000000000", owner.address ,{value : val })
       
       

      //  ////////////
        
      //   await bridge.connect(registrar).addForiegnAsset(zeroAddress , 2 , ["100000000000000000000", "10000000000000000000000"],["test" , "test"] , true , assetManager.address, assetFeeRemitance.address , 1 , false , zeroAddress) 
      //   let wrapped = await bridge.wrappedForiegnPair(zeroAddress , 2)
      //   console.log(wrapped)
      //   let mintID = await registry.getID( 2, bridge.chainId(), zeroAddress ,  "100000000000000000000",  owner.address , 0)
      //   await registry.connect(oracle).registerMintTransaction(mintID ,2,zeroAddress, "100000000000000000000" ,  owner.address , 0)

      //   let transaction = await registry.mintTransactions(mintID)
       
      //   let signatures = [];
      //   let id = await bridge.chainId();
      //   let message = await registry.getID( id.toString(),transaction[0] , transaction[1] , transaction[2],  transaction[3],transaction[4])
      
        
      //   signatures[0] = await validator1.signMessage(await ethers.utils.arrayify(message))
      //   signatures[1] = await validator2.signMessage(await ethers.utils.arrayify(message))
      //   signatures[2] = await validator3.signMessage(await ethers.utils.arrayify(message))
      //   signatures[3] = await validator4.signMessage(await ethers.utils.arrayify(message))
      //   signatures[4] = await validator5.signMessage(await ethers.utils.arrayify(message))
   
      //   await registry.connect(validator3).validateTransaction(mintID , signatures ,true)
        

      //   let wrappedAddress = await bridge.wrappedForiegnPair(zeroAddress , 2)
      //   console.log(wrappedAddress)
      //   let wrappedToken =  await ethers.getContractAt('WrappedToken',wrappedAddress , owner);
      //   let balance =await wrappedToken.balanceOf(owner.address)
      //   console.log(balance)
      //   // await expect(balance).to.equal("100000000000000000000");
        
        
      //   // console.log(newBridgeContract)
      //   await bridge.connect(owner).initialMigration(newBridge.address);
      //   // await time.increase(180000);


      // const sevenDays = 3 * 24 * 60 * 60 ;

      // const blockNumBefore = await ethers.provider.getBlockNumber();
      // const blockBefore = await ethers.provider.getBlock(blockNumBefore);
      // const timestampBefore = blockBefore.timestamp;

      // await ethers.provider.send('evm_increaseTime', [sevenDays]);
      // await ethers.provider.send('evm_mine');

      // const blockNumAfter = await ethers.provider.getBlockNumber();
      // const blockAfter = await ethers.provider.getBlock(blockNumAfter);
      // const timestampAfter = blockAfter.timestamp;
      // console.log( timestampBefore)
      //   console.log( timestampAfter - timestampBefore)
      //   console.log(await bridge.getAssetCount());
      //   console.log(await bridge.nMigrationAt());
      //   console.log(await bridge.migrator());
      //   await bridge.connect(owner).migrateNative(1);
      //   await bridge.connect(owner).migrateForiegn(1);
      //   // await expect(balance).to.equal("100000000000000000000");

        
      //   console.log(await bridge.nMigrationAt());
      //   console.log(await bridge.nMigrationAt());
      //   expect(await bridge.fMigrationAt()).to.equal(1);
      //  });
      //  it("should allow  Owner Pause Bridge", async function () {
      //    expect( await bridge.connect(owner).pauseBrigde() 
      //       ).to.not.throw;
      // });

      // it("should be able to burn minted asset", async function () {
      //   await settings.connect(owner).setNetworkSupportedChains([2] , ["10000000000000000000"] , true)
      //   console.log(await settings.isNetworkSupportedChain(2))
      //   await bridge.connect(registrar).addForiegnAsset(zeroAddress , 2 ,["100000000000000000000", "10000000000000000000000" ],["test" , "test" ], true , assetManager.address, assetFeeRemitance.address , 1) 
        
      //   let mintID = await registry.getID( 2, bridge.chainId(), zeroAddress ,  "100000000000000000000",  owner.address , 0)
      //   await registry.connect(oracle).registerMintTransaction(mintID ,2,zeroAddress, "100000000000000000000" ,  owner.address , 0)

      //   let transaction = await registry.mintTransactions(mintID)
       
      //   let signatures = [];
      //   let id = await bridge.chainId();
      //   let message = await registry.getID( id.toString(),transaction[0] , transaction[1] , transaction[2],  transaction[3],transaction[4])
      
        
      //   signatures[0] = await validator1.signMessage(await ethers.utils.arrayify(message))
      //   signatures[1] = await validator2.signMessage(await ethers.utils.arrayify(message))
      //   signatures[2] = await validator3.signMessage(await ethers.utils.arrayify(message))
      //   signatures[3] = await validator4.signMessage(await ethers.utils.arrayify(message))
      //   signatures[4] = await validator5.signMessage(await ethers.utils.arrayify(message))
      //   await registry.connect(validator3).validateTransaction(mintID , signatures ,true)
      //   bridge.mint(mintID);

      //   let wrappedAddress =await bridge.wrappedForiegnPair(zeroAddress , 2)
      //   console.log(wrappedAddress)
      //   let wrappedToken =  await ethers.getContractAt('WRAPPEDTOKEN',wrappedAddress , owner);
      //   console.log(await wrappedToken.signer)
      //   console.log(await wrappedToken.balanceOf(owner.address))
      //   await wrappedToken.approve(bridge.address, "100000000000000000000" )
      //   console.log(await wrappedToken.allowance(owner.address,bridge.address))
      //   let val = await feeController.getBridgeFee(owner.address, wrappedAddress , 2 )
      //    console.log(val)
      //   expect(await bridge.connect(owner).burn(wrappedAddress, "100000000000000000000", owner.address ,{value : val })).to.not.throw
      // });
  
});