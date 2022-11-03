import { parseEther } from 'ethers/lib/utils';
import fs from 'fs';
import { ethers } from "hardhat";
import fetch from "isomorphic-unfetch"


async function main() {
    const response = await fetch("https://mainnet.bridgeserver.online/")
    const data = await response.json()
    const network = data.networks
    let settingAddress;
    for(let i = 0; i < network.length; i++) {
        if(network[i].chain_id == "250"){
            settingAddress = network[i].settings_address;
        }
    }
    const fees = fs.readFileSync("./netWorkFees/ftm.json")
    const config = JSON.parse(fees.toString())
    const chainId = []
    const ftmValue = []
    /// making sure you don't add the chainId of the chain
    for(let i = 0; i < config.length; i++){
        if(config[i].chainId != "250"){
            chainId.push(Number(config[i].chainId))
            ftmValue.push(parseEther(config[i].ftmValue))
        }
    }
    const settingsContract = await ethers.getContractAt("Settings", settingAddress)
    await settingsContract.setNetworkSupportedChains(
        chainId,ftmValue,true
    )
    console.log("updated fee on Fantom Opera successfully")
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});