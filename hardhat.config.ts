import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "solidity-coverage"
import "hardhat-contract-sizer";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.4.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    bscMainnet: {
      url: "https://evocative-little-morning.bsc.quiknode.pro/c98af53745d5225e4e797f07f8d6216e2edb94c5/",
      chainId : 56,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    arbitrumMainnet: {
      url: "https://restless-few-layer.arbitrum-mainnet.quiknode.pro/07b39a6db097819a99f1c47740971e47c36aff1b/",
      chainId : 42161,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    polygonMainnet: {
      url: "https://smart-cold-gas.matic.quiknode.pro/3349f36d7df7ebdd55aa424ac7aeb2269ad5886f/",
      chainId : 137,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    avaxMainnet: {
      url: "https://winter-responsive-river.avalanche-mainnet.quiknode.pro/e2385b27fb2038fb23f07a04e9122f178509ead7/ext/bc/C/rpc",
      chainId : 43114,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    kccMainnet: {
      url: "https://rpc-mainnet.kcc.network",
      chainId : 321,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    fantomMainnet: {
      url: "https://rough-cold-model.fantom.quiknode.pro/91212aadc0150225909ac4e23e9f2f9dcd8c2da8/",
      chainId : 250,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    EtheriumMainnet: {
      url: "https://small-evocative-hill.quiknode.pro/ad5d52011b1d4a9c67610e68aa3281a3e5844b54/",
      chainId : 1,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },

    optimismMainnet: {
      url: "https://red-neat-grass.optimism.quiknode.pro/1c8220c42e58609f99867d8af1ac4cd01a98f896/",
      chainId : 10,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    harmonyMainnet: {
      url: "https://radial-wider-meme.harmony-mainnet.quiknode.pro/76c01ca09e0cc9b23519cbf4f553ff21c714507d/",
      chainId : 1666600000,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    bobaMainnet: {
      url: "https://mainnet.boba.network",
      chainId : 288,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    okcMainnet: {
      url: "https://exchainrpc.okex.org",
      chainId : 66,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    novaMainnet: {
      url: "https://nova.arbitrum.io/rpc",
      chainId : 42170,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    dogechain: {
      url: "https://rpc-sg.dogechain.dog",
      chainId : 2000,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    elysiumchain: {
      url: "https://elysium-test-rpc.vulcanforged.com/",
      chainId : 1338,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    bobaAvaxchain: {
      url: "https://avax.boba.network",
      chainId : 43288,
      accounts: [process.env.PRIVATE_KEY_OWNER]
    },
    bscTestnet: {
      url: "https://bsc-testnet.public.blastapi.io/",
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY_OWNER],
    },
    // arbizoomTestnet: {
    //   url: "https://nitro-devnet.arbitrum.io/rpc",
    //   chainId : 421612,
    //   accounts : {mnemonic : mnemonic},
    // },
    // polygontestnet: {
    //   url: "https://matic-mumbai.chainstacklabs.com",
    //   chainId : 80001,
    //   accounts: [process.env.PRIVATE_KEY_OWNER]
    // },
    // avaxtestnet: {
    //   url: "https://api.avax-test.network/ext/bc/C/rpc",
    //   chainId : 43113,
    //   accounts: [process.env.PRIVATE_KEY_OWNER]
    // },
    // kcctestnet: {
    //   url: "https://rpc-testnet.kcc.network",
    //   chainId : 322,
    //   accounts: [process.env.PRIVATE_KEY_OWNER]
    // },
    // fantomtestnet: {
    //   url: "https://rpc.testnet.fantom.network",
    //   chainId : 4002,
    //   accounts: [process.env.PRIVATE_KEY_OWNER]
    // },
    // rinkebytestnet: {
    //   url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    //   chainId : 4,
    //   accounts: [process.env.PRIVATE_KEY_OWNER]
    // },
    // harmonytestnet: {
    //   url: "https://api.s0.b.hmny.io",
    //   chainId : 1666700000,
    //   accounts: [process.env.PRIVATE_KEY_OWNER]
    // },
    // metertestnet: {
    //   url: "https://rpctest.meter.io",
    //   chainId : 83,
    //   accounts: [process.env.PRIVATE_KEY_OWNER]
    // },

    // celotestnet: {
    //   url: "https://alfajores-forno.celo-testnet.org",
    //   chainId : 44787,
    //   accounts: [process.env.PRIVATE_KEY_OWNER]
    // },
    // abitrumtestnet: {
    //   url: "https://rinkeby.arbitrum.io/rpc",
    //   chainId : 421611,
    //   accounts: [process.env.PRIVATE_KEY_OWNER]
    // },
    // klaytntestnet: {
    //   url: "https://api.baobab.klaytn.net:8651",
    //   chainId : 1001,
    //   accounts: [process.env.PRIVATE_KEY_OWNER]
    // },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
  },
  etherscan: {
    // apiKey: "629EM9TX2HIJ2F39NIVY2FW37B1JN2METK" //bsc
    // apiKey: "6BE6VHTZAGQVY5MF7K3ZKF6K1556HMW68Z" //polygon
    apiKey: "WC9BP5TQVJUKDP63KED42ZQKNM7NC5HA6U" //eth
    // apiKey: "PZUXVNQZ662DPURSEEZTGUG7GY2MBI853U"// opt
    // apiKey: "RG54X18EJKVTVADRCD28FXQEY3Q7DJ6G4C"// arb
    // apiKey: ""// kcc
    // apiKey: "KXN1I8PNITSUARNZ398W4TV4W93YN8ZIY1"// ftm
    // apiKey: ""// avax

  },
};

export default config;
