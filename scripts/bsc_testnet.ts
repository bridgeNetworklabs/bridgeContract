import { ethers } from "hardhat";

async function bsc_testnet() {
  const feeRemittance = "0xCAfdff06ba31F140D21d794546E67B87ED8eb2dF";
  const gasBank = "0xB15c2B8F12d2bC1d3912f10b3B685284bC3C4862";
  const controllerContract = await ethers.getContractFactory("Controller");
  let controller = await controllerContract.deploy();

  const deployerContract = await ethers.getContractFactory("Deployer");
  let deployer = await deployerContract.deploy(controller.address);

  const SettingContract = await ethers.getContractFactory("Settings");
  let settings = await SettingContract.deploy(
    controller.address,
    feeRemittance,
    gasBank
  );

  const feeControllerContract = await ethers.getContractFactory(
    "FeeController"
  );
  let feeController = await feeControllerContract.deploy(
    controller.address,
    settings.address
  );

  const registryContract = await ethers.getContractFactory("Registry");
  let registry = await registryContract.deploy();

  const bridgePool = await ethers.getContractFactory("BridgePool");
  let pool = await bridgePool.deploy(controller.address);

  const Bridge = await ethers.getContractFactory("Bridge");
  let bridge = await Bridge.deploy(
    controller.address,
    settings.address,
    registry.address,
    deployer.address,
    feeController.address,
    pool.address,
    ethers.constants.AddressZero
  );

  await registry.transferOwnership(bridge.address);
  //await settings.setbrgToken(brgToken.address);
  await deployer.updateBridge(bridge.address);
  await pool.initializePool(bridge.address);
}

bsc_testnet().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
