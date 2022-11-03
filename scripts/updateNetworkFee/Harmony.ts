import { parseEther } from 'ethers/lib/utils';
import fs from 'fs';
import { ethers } from "hardhat";
import fetch from "isomorphic-unfetch"
async function main() {
    const response = await fetch("https://mainnet.bridgeserver.online/")
    const data = await response.json()
    const network = data.networks
    console.log(network)
    let settingAddress;
    for(let i = 0; i < network.length; i++) {
        if(network[i].chain_id == "1666600000"){
            settingAddress = network[i].settings_address;
        }
    }
    const fees = fs.readFileSync("./netWorkFees/harmony.json")
    const config = JSON.parse(fees.toString())
    const chainId = []
    const oneValue = []
    /// making sure you don't add the chainId of the chain
    for(let i = 0; i < config.length; i++){
        if(config[i].chainId != "1666600000"){
            chainId.push(Number(config[i].chainId))
            oneValue.push(parseEther(config[i].oneValue.toFixed(8)))
        }
    }
    const settingsContract = await ethers.getContractAt("Settings", settingAddress)
    await settingsContract.setNetworkSupportedChains(
        chainId,oneValue,true
    )
    console.log("updated fee on Harmony successfully")
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});