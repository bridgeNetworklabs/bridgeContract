import { parseEther } from 'ethers/lib/utils';
import { ethers } from "hardhat";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

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

async function bsc_testnet() {
    let controller: Controller;
    let deployer: Deployer;
    let settings: Settings;
    let feeController: FeeController;
    let registry: Registry;
    let brgToken: Token;
    let newbridge: Bridge
    //let bridge;
    const zeroAddress = ethers.constants.AddressZero
    const feeRemittance = "0xCAfdff06ba31F140D21d794546E67B87ED8eb2dF";
    const gasBank = "0xB15c2B8F12d2bC1d3912f10b3B685284bC3C4862";
    // const controllerContract = await ethers.getContractFactory("Controller");
    // controller = await controllerContract.deploy();

    // const deployerContract = await ethers.getContractFactory("Deployer");
    // deployer = await deployerContract.deploy(controller.address);

    // const SettingContract = await ethers.getContractFactory("Settings");
    // settings = await SettingContract.deploy(
    //     controller.address,
    //     feeRemittance,
    //     gasBank
    // );

    // const feeControllerContract = await ethers.getContractFactory(
    //     "FeeController"
    // );
    // feeController = await feeControllerContract.deploy(
    //     controller.address,
    //     settings.address
    // );

    // const registryContract = await ethers.getContractFactory("Registry");
    // registry = await registryContract.deploy();

    // const bridgePool = await ethers.getContractFactory("BridgePool");
    // let pool = await bridgePool.deploy(controller.address);

    const Bridge = await ethers.getContractFactory("Bridge");
    newbridge = await Bridge.deploy(
        "0x24D238C69F9Dc31EA3aA202Fc751EAD682cfBc44",
        "0x0765e9fe92bB6bEbA30343D0237119e7F0B1ACCB",
        "0x0e97C14768c6f440Cbcad9AE7Ce9e80940CE1084",
        "0x37Cbbac7F2aAcb7B3967bE471974711AB717FeF6",
        "0x261833AC52c4B0dB6C0570B8d3eF7134B1a00670",
        "0xf1D4E0c7e18aB302f893A850792849D93c33ecc3",
        "0xACd068B849eFBf906a63C687D9eC56FfaF14FaB4"
    );

    // console.log(
    //     "Bridge :",
    //     bridge.address,
    //     "\n",
    //     "Settings:",
    //     settings.address,
    //     "\n",
    //     "Registry :",
    //     registry.address,
    //     "\n",
    //     "Pool:",
    //     pool.address,
    //     "\n",
    //     "FeeController :",
    //     feeController.address,
    //     "\n",
    //     "Deployer:",
    //     deployer.address,
    //     "\n",
    //     "Controller :",
    //     controller.address,
    //     "\n"
    // );

    // await registry.transferOwnership(bridge.address);
    // await deployer.updateBridge(bridge.address);
    // await pool.initializePool(bridge.address);
    // await settings
    //     .setNetworkSupportedChains(
    //         [80001, 322],
    //         [parseEther("0.001"), parseEther("0.001")],
    //         true
    //     );

    console.log("registering asset")

    // const BridgeToken = await ethers.getContractFactory("Token");
    // brgToken = await BridgeToken.deploy("Bridge Token", "Brdg");
    // console.log(brgToken.address)
    //await settings.setbrgToken(brgToken.address);
    const FeeController = await ethers.getContractAt("FeeController", "0x261833AC52c4B0dB6C0570B8d3eF7134B1a00670")
    //Controller.addAdmin("0x5D40A6e82D92C2b4Ad2a46c909108FE465Bdc2bb", true)
    const bridge = await ethers.getContractAt("Bridge", "0xACd068B849eFBf906a63C687D9eC56FfaF14FaB4")
    const DAI = await ethers.getContractAt("TetherToken", "0x8a9424745056Eb399FD19a0EC26A14316684e274")
    const Settings = await ethers.getContractAt("Settings", "0x0765e9fe92bB6bEbA30343D0237119e7F0B1ACCB")
    const USDT = await ethers.getContractAt("TetherToken", "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684")
    //await Settings.enableBaseFee()
    // await Settings.setbrgToken(brgToken.address);
    // await brgToken.approve("0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD", parseEther("50000"))
    // await brgToken.transfer("0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD", parseEther("50000"))
    // await brgToken.approve("0x51C4BaacFf3d40854dC549C9FBe46797018Af6C6", parseEther("2000000"))
    // await brgToken.transfer("0x51C4BaacFf3d40854dC549C9FBe46797018Af6C6", parseEther("2000000"))
    // await brgToken.approve("0xc993eF9E1d1033DCA5a14213c81f97BF5eb085a6", parseEther("10000000"))
    // await brgToken.transfer("0xc993eF9E1d1033DCA5a14213c81f97BF5eb085a6", parseEther("10000000"))

    // await FeeController.activateAssetIncentive(true)
    // await FeeController.activateIndexedUserIncentive("0xc993eF9E1d1033DCA5a14213c81f97BF5eb085a6")

    await bridge.initiateMigration(newbridge.address)
    // await bridge.registerRail("0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
    //     parseEther("0.01"),
    //     parseEther("10000"),
    //     [80001, 322],
    //     [zeroAddress, zeroAddress],
    //     false,
    //     feeRemittance,
    //     "0xc993eF9E1d1033DCA5a14213c81f97BF5eb085a6",
    //     0
    // )
    // console.log("registering asset")
    // await bridge.registerRail(
    //     zeroAddress,
    //     parseEther("0.001"),
    //     parseEther("100000"),
    //     [80001],
    //     [zeroAddress],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     1
    // )
    // await bridge.registerRail(
    //     zeroAddress,
    //     parseEther("0.001"),
    //     parseEther("100000"),
    //     [322],
    //     [zeroAddress],
    //     true,
    //     zeroAddress,
    //     zeroAddress,
    //     1
    // )

    // await bridge.registerRail(
    //     "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    //     parseEther("0.001"),
    //     parseEther("100000"),
    //     [80001, 322],
    //     ["0xda627a1f6bc94079b0c65c70b3b307799118943d", "0x3F1A47C1Cf4e4587F016A26dE719CBf0dE80d3FF"],
    //     true,
    //     zeroAddress,
    //     zeroAddress,
    //     1
    // )

    // await bridge.addForiegnAsset(
    //     "0x3F1A47C1Cf4e4587F016A26dE719CBf0dE80d3FF",
    //     322,
    //     [parseEther("0.001"), parseEther("100000")],
    //     ["DAI", "DAI"],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     1,
    //     true,
    //     "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    // )

    // await bridge.addForiegnAsset(
    //     "0xda627a1f6bc94079b0c65c70b3b307799118943d",
    //     80001,
    //     [parseEther("0.001"), parseEther("100000")],
    //     ["DAI", "DAI"],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     1,
    //     true,
    //     "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    // )
    // await bridge.addForiegnAsset(
    //     "0x55d398326f99059fF775485246999027B3197955",
    //     80001,
    //     [parseEther("0.001"), parseEther("100000")],
    //     ["Tether", "USDT"],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     1,
    //     false,
    //     zeroAddress,
    // )

    // await bridge.addForiegnAsset(
    //     "0xE9C803F48dFFE50180Bd5B01dC04DA939E3445Fc",
    //     322,
    //     [parseEther("0.001"), parseEther("100000")],
    //     ["TesToken", "Test"],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     1,
    //     false,
    //     zeroAddress,
    // )

    // await bridge.addForiegnAsset(
    //     zeroAddress,
    //     322,
    //     [parseEther("0.001"), parseEther("100000")],
    //     ["Kucoin", "kcc"],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     1,
    //     true,
    //     zeroAddress,
    // )
    //await bridge.activeNativeAsset(zeroAddress, true)
    // await DAI.approve("0xACd068B849eFBf906a63C687D9eC56FfaF14FaB4", ethers.constants.MaxUint256)
    // await USDT.approve("0xACd068B849eFBf906a63C687D9eC56FfaF14FaB4", ethers.constants.MaxUint256)
    let val = await Settings.networkGas(80001)
    // await bridge.send(
    //     322,
    //     "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    //     parseEther("10"),
    //     "0xc993eF9E1d1033DCA5a14213c81f97BF5eb085a6", {
    //     value: val
    // }
    // )
    // await DAI.approve(bridge.address, parseEther("20000"))
    // await bridge.send(
    //     80001,
    //     "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    //     parseEther("10"),
    //     "0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD", {
    //     value: val
    // }
    // )

    // await bridge.send(
    //     322,
    //     zeroAddress,
    //     parseEther("0.001"),
    //     "0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD", {
    //     value: val.add(parseEther("0.001"))
    // }
    // )

    // await bridge.activeNativeAsset("0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684", true)
    // await bridge.activeNativeAsset("0x8a9424745056Eb399FD19a0EC26A14316684e274", true)
    console.log("succesful")
}

bsc_testnet().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
