import fetch from "isomorphic-unfetch"

const getAddress = async() => {
    const response = await fetch("https://mainnet.bridgeserver.online/")
    const data = await response.json()
    console.log(data)
}

getAddress()