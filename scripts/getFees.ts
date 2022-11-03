import fetch from "isomorphic-unfetch";
import fs from "fs";

type ChainIdPrice = {
  chainId: number;
  amountUsd: number;
};

const getBnbFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})
  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const bnb = {
      chainId: FeesInUSD[i]["chainId"],
      bnbValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(bnb);
  }
  fs.writeFileSync("./netWorkFees/bnb.json", JSON.stringify(result, null, 2));
};

const getEthFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})
 
  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const eth = {
      chainId: FeesInUSD[i]["chainId"],
      ethValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(eth);
  }
  fs.writeFileSync("./netWorkFees/eth.json", JSON.stringify(result, null, 2));
};

const getkcsFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})
  
  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const kcs = {
      chainId: FeesInUSD[i]["chainId"],
      kcsValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(kcs);
  }
  fs.writeFileSync("./netWorkFees/kcs.json", JSON.stringify(result, null, 2));
};

const getmaticFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})
  
  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const matic = {
      chainId: FeesInUSD[i]["chainId"],
      maticValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(matic);
  }
  fs.writeFileSync("./netWorkFees/matic.json", JSON.stringify(result, null, 2));
};

const getfantomFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})
  
  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const matic = {
      chainId: FeesInUSD[i]["chainId"],
      ftmValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(matic);
  }
  fs.writeFileSync("./netWorkFees/ftm.json", JSON.stringify(result, null, 2));
};

const getAvaxFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})
  
  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const matic = {
      chainId: FeesInUSD[i]["chainId"],
      AvaxValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(matic);
  }
  fs.writeFileSync("./netWorkFees/avax.json", JSON.stringify(result, null, 2));
};
const getDogeChainFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})

  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const matic = {
      chainId: FeesInUSD[i]["chainId"],
      dogeValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(matic);
  }
  fs.writeFileSync("./netWorkFees/doge.json", JSON.stringify(result, null, 2));
};
const getHarmonyFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})
  
  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const one = {
      chainId: Number(FeesInUSD[i]["chainId"]),
      oneValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(one);
  }
  fs.writeFileSync(
    "./netWorkFees/harmony.json",
    JSON.stringify(result, null, 2)
  );
};

const getOktFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})
  
  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const okt = {
      chainId: FeesInUSD[i]["chainId"],
      oktValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(okt);
  }
  fs.writeFileSync("./netWorkFees/okt.json", JSON.stringify(result, null, 2));
};
const getBobaFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})
  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const boba = {
      chainId: FeesInUSD[i]["chainId"],
      bobaValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(boba);
  }
  fs.writeFileSync("./netWorkFees/boba.json", JSON.stringify(result, null, 2));
};
const getlavaFees = async (price: number, FeesInUSD: ChainIdPrice[]) => {
  //const fees = fs.readFileSync("./fees.json", {encoding:"utf8"})
  const result = [];
  for (let i = 0; i < FeesInUSD.length; i++) {
    const boba = {
      chainId: FeesInUSD[i]["chainId"],
      lavaValue: FeesInUSD[i]["amountUsd"] / price,
    };
    result.push(boba);
  }
  fs.writeFileSync("./netWorkFees/lava.json", JSON.stringify(result, null, 2));
};
const getFees = async () => {
  const result: ChainIdPrice[] = [];
  try {
    const response = await fetch(
      "https://mainnet.bridgeserver.online/api/networks/fees"
    );
    const response2 = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=kucoin-shares%2Cbinancecoin%2Cmatic-network%2Cethereum%2Cfantom%2Charmony%2Cavalanche-2%2Coec-token%2Cdogecoin%2Cboba-network%2Celysiumg&vs_currencies=usd"
    );
    const data = await response.json();
    const usdValue = await response2.json();
    //console.log(usdValue)
    for (let i = 0; i < data["data"].length; i++) {
      let usd = 0;
      if (data["data"][i]["chain_id"] == "321") {
        usd = usdValue["kucoin-shares"].usd;
      } else if (data["data"][i]["chain_id"] == "56") {
        usd = usdValue["binancecoin"].usd;
      } else if (data["data"][i]["chain_id"] == "250") {
        usd = usdValue["fantom"].usd;
      } else if (data["data"][i]["chain_id"] == "43114") {
        usd = usdValue["avalanche-2"].usd;
      } else if (data["data"][i]["chain_id"] == "137") {
        usd = usdValue["matic-network"].usd;
      } else if (data["data"][i]["chain_id"] == "66") {
        usd = usdValue["oec-token"].usd;
      } else if (data["data"][i]["chain_id"] == "1666600000") {
        usd = usdValue["harmony"].usd;
      } else if (data["data"][i]["chain_id"] == "2000") {
        usd = usdValue["dogecoin"].usd;
      } else if (data["data"][i]["chain_id"] == "43288") {
        usd = usdValue["boba-network"].usd;
      } else if (data["data"][i]["chain_id"] == "1338") {
        usd = 0.1;
      } else if (
        data["data"][i]["chain_id"] == "42161" ||
        "10" ||
        "1" ||
        "288" ||
        "42170"
      ) {
        usd = usdValue["ethereum"].usd;
      }
      const amount =
        Number(data["data"][i]["last_oracle"]) +
        Number(data["data"][i]["last_validator"]);
      //console.log(usd,":", data["data"][i]["chain_id"] )
      const distribution = {
        chainId: data["data"][i]["chain_id"],
        amountUsd: Number((amount * usd).toFixed(6)),
      };
      result.push(distribution);
    }
    fs.writeFileSync("./fees.json", JSON.stringify(result, null, 2));
    await getBnbFees(usdValue["binancecoin"].usd, result);
    await getmaticFees(usdValue["matic-network"].usd, result);
    await getBobaFees(usdValue["boba-network"].usd, result);
    await getEthFees(usdValue["ethereum"].usd, result);
    await getOktFees(usdValue["oec-token"].usd, result);
    await getHarmonyFees(usdValue["harmony"].usd, result);
    await getAvaxFees(usdValue["avalanche-2"].usd, result);
    await getDogeChainFees(usdValue["dogecoin"].usd, result);
    await getfantomFees(usdValue["fantom"].usd, result);
    await getkcsFees(usdValue["kucoin-shares"].usd, result);
    await getlavaFees(0.1, result);
  } catch (error) {}
};

getFees();
