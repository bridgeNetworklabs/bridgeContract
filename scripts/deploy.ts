// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
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

async function main() {

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  let controller: Controller;
  let deployer: Deployer;
  let settings: Settings;
  let feeController: FeeController;
  let registry: Registry;
  let bridge: Bridge;
  let socket: BridgeSocket;
  let pool: BridgePool;
  let brgToken: Token;
  const validator1 = ""; //
  const validator2 = ""; //
  const validator3 = ""; //
  const validator4 = ""; //
  const validator5 = ""; //

  const oracle1 = ""; //
  const oracle2 = ""; //

  const oracle3 = ""; //
  const oracle4 = ""; //
  const oracle5 = ""; //

  const registrar = ""; //
  const feeAccount = "";
  const gasBank = "";

  const controllerContract = await hre.ethers.getContractFactory("Controller");
  controller = await controllerContract.deploy();
  // await controller.deployed();
  console.log("controller : ", controller.address);
  const settingsContract = await hre.ethers.getContractFactory("Settings");
  settings = await settingsContract.deploy(
    controller.address,
    feeAccount,
    gasBank
  );
  // await settings.deployed();
  console.log("settings : ", settings.address);
  const deployerContract = await hre.ethers.getContractFactory("Deployer");
  deployer = await deployerContract.deploy(controller.address);
  // await deployer.deployed();
  console.log("deployer : ", deployer.address);
  const feeControllerContract = await hre.ethers.getContractFactory(
    "FeeController"
  );
  feeController = await feeControllerContract.deploy(
    controller.address,
    settings.address
  );
  // await feeController.deployed();
  console.log("feeController : ", feeController.address);
  const registryContract = await hre.ethers.getContractFactory("Registry");
  registry = await registryContract.deploy();
  // await registry.deployed();
  console.log("registry : ", registry.address);

  const BridgePool = await hre.ethers.getContractFactory("BridgePool");
  pool = await BridgePool.deploy(controller.address);
  console.log("pool : ", pool.address);

  const bridgeContract = await hre.ethers.getContractFactory("Bridge");
  bridge = await bridgeContract.deploy(
    controller.address,
    settings.address,
    registry.address,
    deployer.address,
    feeController.address,
    pool.address,
    "0x0000000000000000000000000000000000000000"
  );
  // const bridge = await bridgeContract.deploy( "0x87bD0823901B3A4108E62EC35D86B461dD3ab516" , "0x212FFBcb4211763f1370515d17bA8B756026A611", "0x0218eE37d75434289F3FE4E2C9D4bce1daCB1aF7" , "0x8551122099e2A5A3A7A015a1Db1Ad45703a26EFf" ,"0x08f4C1d2191464d8b2FCc466e2cF621cAF560604" ,"0x0000000000000000000000000000000000000000");
  await bridge.deployed();
  console.log("bridge : ", bridge.address);

  await registry.transferOwnership(bridge.address);
  console.log("transfering ownership");

  await deployer.updateBridge(bridge.address);

  await pool.initializePool(bridge.address);

  await controller.addRegistrar(registrar, true);
  console.log("adding oracles");
  await controller.addOracle(oracle1, true);
  await controller.addOracle(oracle2, true);
  await controller.addOracle(oracle3, true);
  await controller.addOracle(oracle4, true);
  await controller.addOracle(oracle5, true);
  console.log("adding validators");

  await controller.addValidator(validator1, true);
  await controller.addValidator(validator2, true);
  await controller.addValidator(validator3, true);
  await controller.addValidator(validator4, true);
  await controller.addValidator(validator5, true);

  console.log("setting chains ");
  await settings.setMinValidationPercentage(80);
  await settings.setNetworkSupportedChains(
    [43288, 66, 288, 56, 43114, 250, 137, 321, 10, 1, 42161, 1666600000, 42170, 2000, 1338],
    [
      0,
      "51000000000000000",
      "88000000000000000",
      "73000000000000000",
      "36000000000000000",
      "22000000000000000",
      "58000000000000000",
      "22000000000000000",
      "58000000000000000",
      "1100000000000000000",
      "58000000000000000",
      "29000000000000000",
      "29000000000000000",
      "22000000000000000",
      "22000000000000000"
    ],
    true
  );


  // [43288 , 66, 288, 56, 43114, 250, 137, 321, 10, 1, 42161 , 1666600000 , 42170 , 2000 , 1338 ],
  // [ 1, 0.7 , 1.2 , 1 , 0.5 , 0.3 , 0.8 , 0.3 , 0.8 , 15 , 0.8 , 0.4 ,0.4 , 0.3 , 0.3 ]


  //  43288 [0,"51000000000000000","88000000000000000","73000000000000000","36000000000000000","22000000000000000", "58000000000000000", "22000000000000000", "58000000000000000", "1100000000000000000", "58000000000000000", "29000000000000000","29000000000000000","22000000000000000", "22000000000000000"]
  //   66   [56000000000000000 , 0 , 67000000000000000 ,]
  // 288
  // 56
  // 43114
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.


}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});