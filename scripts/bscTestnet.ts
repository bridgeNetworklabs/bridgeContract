import { Socket } from "dgram";
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
    let controller: Controller;
    let deployer: Deployer;
    //let settings: Settings;
    let feeController: FeeController;
    let registry: Registry;
    //let bridge: Bridge;
    let socket: BridgeSocket;
    let pool: BridgePool;
    let brgToken: Token;
    let zeroAddress = ethers.constants.AddressZero;

    console.log("Starting");

    // const controllerContract = await ethers.getContractFactory("Controller");
    // controller = await controllerContract.deploy();

    // const deployerContract = await ethers.getContractFactory("Deployer");
    // deployer = await deployerContract.deploy("0x25eBFAb1fd954505F0f1c0C29363e88C409c1Da8");

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
    // pool = await bridgePool.deploy("0x25eBFAb1fd954505F0f1c0C29363e88C409c1Da8");

    // const Bridge = await ethers.getContractFactory("Bridge");
    // const bbridge = await Bridge.deploy(
    //     "0x25eBFAb1fd954505F0f1c0C29363e88C409c1Da8",
    //     "0xBc0f4798F3E88C8E1f73E79350c2b53df5F15BE0",
    //     registry.address,
    //     "0x61B7A873276cdf55a2Db504B5FdCdBE747b5Bb0a",
    //     "0x5Ff27F131A0668192C0DC38532104DEc5D307546",
    //     pool.address,
    //     zeroAddress
    // );

    // // const BridgeToken = await ethers.getContractFactory("Token");
    // // brgToken = await BridgeToken.deploy("Bridge Token", "Brdg");

    //const Deployer = await ethers.getContractAt("Deployer", "0x61B7A873276cdf55a2Db504B5FdCdBE747b5Bb0a")
    // await deployer.updateBridge(bridge.address)

    // console.log(
    //     "Bridge:",
    //     bridge.address,
    //     "\n",
    //     // "Controller:",
    //     // controller.address,
    //     "\n",
    //     "Pool:",
    //     pool.address,
    //     "\n",
    //     // "FeeController:",
    //     // feeController.address,
    //     "Registry:",
    //     registry.address,
    //     "\n",
    //     // "Settings:",
    //     // settings.address,
    //     // "\n",
    //     // "Deployer:",
    //     // deployer.address
    // );

    // await registry.transferOwnership(bridge.address);
    // //await settings.setbrgToken("0xfB6862204AcE103AE8752A20Aafa3e1245f26bBE");
    // //await deployer.updateBridge(bridge.address);
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

    // const BridgeSocket = await ethers.getContractFactory("BridgeSocket")
    // socket = await BridgeSocket.deploy("0xBc0f4798F3E88C8E1f73E79350c2b53df5F15BE0", bridge.address, "0x20A32140f528cb30468323fac895a2fb398c531A")

    const bridge = await ethers.getContractAt("Bridge", "0x3BFA9178cD8a1BbFe5486e4783611532a4602ff4")
    //const settings = await ethers.getContractAt("Settings", "0xBc0f4798F3E88C8E1f73E79350c2b53df5F15BE0")
    // const DAi = await ethers.getContractAt("Token", "0x8a9424745056Eb399FD19a0EC26A14316684e274")
    const USDT = await ethers.getContractAt("Token", "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684")
    // const controller = await ethers.getContractAt("Controller", "0x25eBFAb1fd954505F0f1c0C29363e88C409c1Da8")
    //const val = await settings.networkGas(80001)
    // await DAi.approve("0xEB81ABD4109ed4030d5E68A9525C138C1e9dA637", parseEther("100000"))
    await USDT.approve("0x9152efD02D5b31f86786804b31624a2F2e848e15", parseEther("100000"))
    const Socket = await ethers.getContractAt("BridgeSocket", "0x9152efD02D5b31f86786804b31624a2F2e848e15")
    const val = await Socket.getTransactionGas(80001)
    // await bridge.initiateMigration(newbridge.address)

    // await bridge.registerRail(
    //     zeroAddress,
    //     parseEther("0.01"),
    //     parseEther("100000"),
    //     [322],
    //     [zeroAddress],
    //     true,
    //     zeroAddress,
    //     zeroAddress,
    //     2
    // );
    // await bridge.send(
    //     80001,
    //     zeroAddress,
    //     parseEther("0.02"),
    //     "0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD",
    //     { value: val.add(parseEther("0.02")) }
    // )

    await Socket.bridgeAsset(
        "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
        80001,
        parseEther("10"),
        "0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD",
        {
            value: val
        }
    )

    // await bridge.send(
    //     322,
    //     zeroAddress,
    //     parseEther("0.02"),
    //     "0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD",
    //     { value: val.add(parseEther("0.02")) }
    // )

    // await bridge.send(
    //     322,
    //     "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
    //     parseEther("10"),
    //     "0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD",
    //     { value: val }
    // )

    // await bridge.send(
    //     80001,
    //     "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
    //     parseEther("10"),
    //     "0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD",
    //     { value: val }
    // )

    // await bridge.send(
    //     80001,
    //     "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    //     parseEther("10"),
    //     "0xf82a0B7118439f82B0f9D381F0A4dFbB40dfF7fD",
    //     { value: val }
    // )

    // await bridge.activeNativeAsset(zeroAddress, true)
    // await bridge.activeNativeAsset("0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684", true)
    // await bridge.activeNativeAsset("0x8a9424745056Eb399FD19a0EC26A14316684e274", true)
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
    // )

    // await bridge.updateAddresses(
    //     "0xBc0f4798F3E88C8E1f73E79350c2b53df5F15BE0",
    //     "0x5Ff27F131A0668192C0DC38532104DEc5D307546",
    //     "0x33ae4f710C3b250326E69dDFd3cD7b96e1718Ce4"
    // )

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


// Bridge: 0x3BFA9178cD8a1BbFe5486e4783611532a4602ff4

// Pool: 0x702f9A8c4138148b9EF7661fC285D0D00766c788
// Registry: 0xD81a6cD87443B47FeAFceF6c6c0Ee9913995b0FB 