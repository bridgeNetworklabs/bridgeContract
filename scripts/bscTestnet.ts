import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
isFinite;
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

async function bscTestnet() {
    // let controller: Controller;
    // let deployer: Deployer;
    // let settings: Settings;
    // let feeController: FeeController;
    // let registry: Registry;
    // let bridge: Bridge;
    // let socket: BridgeSocket;
    // let pool: BridgePool;
    // let brgToken: Token;
    let zeroAddress = ethers.constants.AddressZero;

    console.log("Starting");

    // const controllerContract = await ethers.getContractFactory("Controller");
    // controller = await controllerContract.deploy();

    // const deployerContract = await ethers.getContractFactory("Deployer");
    // deployer = await deployerContract.deploy(controller.address);

    // const SettingContract = await ethers.getContractFactory("Settings");
    // settings = await SettingContract.deploy(
    //     controller.address,
    //     "0x5D40A6e82D92C2b4Ad2a46c909108FE465Bdc2bb",
    //     "0x5D40A6e82D92C2b4Ad2a46c909108FE465Bdc2bb"
    // );

    // await settings.setNetworkSupportedChains(
    //     [80001, 322],
    //     [parseEther("0.01"), parseEther("0.01")],
    //     true
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
    // pool = await bridgePool.deploy(controller.address);

    const Bridge = await ethers.getContractFactory("Bridge");
    let newbridge = await Bridge.deploy(
        "0x6B6703aA57Fe5b24Cc72D48a6E530CD4C95E11Ea",
        "0x93F87CD1686E0E3F8DB8991967231884C7EaDfF5",
        "0xdcF96310297a59b1842373aFd35bb4DE7Edf906a",
        "0x1A3cD8B05244Ae5547EA20b9D9a0DE38e04DB33D",
        "0x53E3108920355EBdD3D98C87657f15bd493eA609",
        "0x8B94B041dD2BAa132Cf000d64e4328929Ebc7526",
        "0x067b4B507edFA9874B700D42CeAbA4848711626D"
    );

    // const BridgeToken = await ethers.getContractFactory("Token");
    // brgToken = await BridgeToken.deploy("Bridge Token", "Brdg");

    // console.log(
    //     "Bridge:",
    //     bridge.address,
    //     "\n",
    //     "Controller:",
    //     controller.address,
    //     "\n",
    //     "Pool:",
    //     pool.address,
    //     "\n",
    //     "FeeController:",
    //     feeController.address,
    //     "Registry:",
    //     registry.address,
    //     "\n",
    //     "Settings:",
    //     settings.address,
    //     "\n",
    //     "Deployer:",
    //     deployer.address
    // );

    // await registry.transferOwnership(bridge.address);
    // await settings.setbrgToken(brgToken.address);
    // await deployer.updateBridge(bridge.address);
    // await pool.initializePool(bridge.address);

    // await bridge.registerRail(
    //     "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
    //     parseEther("0.01"),
    //     parseEther("100000"),
    //     [80001, 322],
    //     [zeroAddress],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     2
    // );

    // await bridge.registerRail(
    //     zeroAddress,
    //     parseEther("0.01"),
    //     parseEther("100000"),
    //     [80001],
    //     [zeroAddress],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     2
    // );
    // await bridge.registerRail(
    //     zeroAddress,
    //     parseEther("0.01"),
    //     parseEther("100000"),
    //     [80001],
    //     [zeroAddress],
    //     true,
    //     zeroAddress,
    //     zeroAddress,
    //     2
    // );

    // await bridge.registerRail(
    //     "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    //     parseEther("0.01"),
    //     parseEther("100000"),
    //     [80001, 322],
    //     [
    //         "0xda627a1f6bc94079b0c65c70b3b307799118943d",
    //         "0x3F1A47C1Cf4e4587F016A26dE719CBf0dE80d3FF",
    //     ],
    //     true,
    //     zeroAddress,
    //     zeroAddress,
    //     2
    // );

    const bridge = await ethers.getContractAt("Bridge", "0x067b4B507edFA9874B700D42CeAbA4848711626D")
    const settings = await ethers.getContractAt("Settings", "0x93F87CD1686E0E3F8DB8991967231884C7EaDfF5")
    const DAi = await ethers.getContractAt("Token", "0x8a9424745056Eb399FD19a0EC26A14316684e274")
    const USDT = await ethers.getContractAt("Token", "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684")
    const controller = await ethers.getContractAt("Controller", "0x6B6703aA57Fe5b24Cc72D48a6E530CD4C95E11Ea")
    const val = await settings.networkGas(80001)
    await DAi.approve("0x067b4B507edFA9874B700D42CeAbA4848711626D", parseEther("100000"))
    await USDT.approve("0x067b4B507edFA9874B700D42CeAbA4848711626D", parseEther("100000"))

    // await bridge.send(
    //     80001,
    //     zeroAddress,
    //     parseEther("0.02"),
    //     "0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD",
    //     { value: val.add(parseEther("0.02")) }
    // )
    await bridge.initiateMigration(newbridge.address)

    //await settings.setbrgToken("0xfB6862204AcE103AE8752A20Aafa3e1245f26bBE")


    // await bridge.send(
    //     322,
    //     "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
    //     parseEther("10"),
    //     "0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD",
    //     { value: val }
    // )

    // await bridge.activeNativeAsset(zeroAddress, true)
    //await bridge.activeNativeAsset("0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684", true)
    // await controller.addAdmin("0x5D40A6e82D92C2b4Ad2a46c909108FE465Bdc2bb", true)

    // await bridge.addForiegnAsset(
    //     "0x3F1A47C1Cf4e4587F016A26dE719CBf0dE80d3FF",
    //     322,
    //     [parseEther("0.01"), parseEther("100000")],
    //     ["Dai Token", "DAI"],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     2,
    //     true,
    //     "0x8a9424745056Eb399FD19a0EC26A14316684e274"
    // );

    // await bridge.addForiegnAsset(
    //     "0xda627a1f6bc94079b0c65c70b3b307799118943d",
    //     80001,
    //     [parseEther("0.01"), parseEther("100000")],
    //     ["Dai Token", "DAI"],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     2,
    //     true,
    //     "0x8a9424745056Eb399FD19a0EC26A14316684e274"
    // );

    // await bridge.addForiegnAsset(
    //     "0x55d398326f99059fF775485246999027B3197955",
    //     80001,
    //     [parseEther("0.01"), parseEther("100000")],
    //     ["Tether", "USDT"],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     2,
    //     false,
    //     zeroAddress
    // );

    // await bridge.addForiegnAsset(
    //     "0xE9C803F48dFFE50180Bd5B01dC04DA939E3445Fc",
    //     322,
    //     [parseEther("0.01"), parseEther("100000")],
    //     ["Tether", "USDT"],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     2,
    //     false,
    //     zeroAddress
    // );

    // await bridge.addForiegnAsset(
    //     zeroAddress,
    //     322,
    //     [parseEther("0.01"), parseEther("100000")],
    //     ["kcc coin", "kcc"],
    //     false,
    //     zeroAddress,
    //     zeroAddress,
    //     2,
    //     true,
    //     zeroAddress
    // );

    console.log("Successful");
}

bscTestnet().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
