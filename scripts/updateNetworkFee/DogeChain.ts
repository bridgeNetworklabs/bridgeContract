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
        if(network[i].chain_id == "2000"){
            settingAddress = network[i].settings_address;
        }
    }
    const fees = fs.readFileSync("./netWorkFees/eth.json")
    const config = JSON.parse(fees.toString())
    const chainId = []
    const dogeValue = []
    /// making sure you don't add the chainId of the chain
    for(let i = 0; i < config.length; i++){
        if(config[i].chainId != "2000"){
            chainId.push(Number(config[i].chainId))
            dogeValue.push(parseEther(config[i].dogeValue))
        }
    }
    const settingsContract = await ethers.getContractAt("Settings", settingAddress)
    await settingsContract.setNetworkSupportedChains(
        chainId,dogeValue,true
    )
    console.log("updated fee on DogeChain successfully")
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});