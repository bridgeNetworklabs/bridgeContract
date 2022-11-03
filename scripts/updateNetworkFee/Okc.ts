import { parseEther } from 'ethers/lib/utils';
import fs from 'fs';
import { ethers } from "hardhat";
import fetch from "isomorphic-unfetch"


async function main() {
    const response = await fetch("https://mainnet.bridgeserver.online/")
    const data = await response.json()
    const network = data.networks;
    let settingAddress;
    for(let i = 0; i < network.length; i++) {
        if(network[i].chain_id == "66"){
            settingAddress = network[i].settings_address;
        }
    }
    const fees = fs.readFileSync("./netWorkFees/okt.json")
    const config = JSON.parse(fees.toString())
    const chainId = []
    const oktValue = []
    // making sure you don't add the chainId of the chain
    for(let i = 0; i < config.length; i++){
        if(config[i].chainId != "66"){
            chainId.push(Number(config[i].chainId))
            oktValue.push(parseEther(config[i].oktValue.toFixed(8)))
        }
    }
    const settingsContract = await ethers.getContractAt("Settings", settingAddress)
    await settingsContract.setNetworkSupportedChains(
        chainId,oktValue,true
    )
    console.log("updated fee on Okc Mainnet successfully")
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});