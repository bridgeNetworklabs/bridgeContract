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
        if(network[i].chain_id == "137"){
            settingAddress = network[i].settings_address;
        }
    }
    const fees = fs.readFileSync("./netWorkFees/matic.json")
    const config = JSON.parse(fees.toString())
    const chainId = []
    const maticValue = []
    /// making sure you don't add the chainId of the chain
    for(let i = 0; i < config.length; i++){
        if(config[i].chainId != "137"){
            chainId.push(Number(config[i].chainId))
            maticValue.push(parseEther(config[i].maticValue))
        }
    }
    const settingsContract = await ethers.getContractAt("Settings", settingAddress)
    await settingsContract.setNetworkSupportedChains(
        chainId,maticValue,true
    )
    console.log("updated fee on Polygon Mainnet successfully")
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});