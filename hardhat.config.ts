import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage"
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
            enabled: false,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    // bscMainnet: {
    //   url: "https://speedy-nodes-nyc.moralis.io/082850e453afa12bbf26b94e/bsc/mainnet",
    //   chainId : 56,
    //   accounts: {mnemonic : mnemonic},
    // },
    // arbitrumMainnet: {
    //   url: "https://speedy-nodes-nyc.moralis.io/082850e453afa12bbf26b94e/arbitrum/mainnet",
    //   chainId : 42161,
    //   accounts: {mnemonic : mnemonic},
    // },
    // polygonMainnet: {
    //   url: "https://speedy-nodes-nyc.moralis.io/082850e453afa12bbf26b94e/polygon/mainnet",
    //   chainId : 137,
    //   accounts: {mnemonic : mnemonic},
    // },
    // avaxMainnet: {
    //   url: "https://api.avax.network/ext/bc/C/rpc",
    //   chainId : 43114,
    //   accounts: {mnemonic : mnemonic},
    // },
    // kccMainnet: {
    //   url: "https://rpc-mainnet.kcc.network",
    //   chainId : 321,
    //   accounts: {mnemonic : mnemonic},
    // },
    // fantomMainnet: {
    //   url: "https://speedy-nodes-nyc.moralis.io/082850e453afa12bbf26b94e/fantom/mainnet",
    //   chainId : 250,
    //   accounts: {mnemonic : mnemonic},
    // },
    // EtheriumMainnet: {
    //   url: "https://speedy-nodes-nyc.moralis.io/082850e453afa12bbf26b94e/eth/mainnet",
    //   chainId : 1,
    //   accounts: {mnemonic : mnemonic},
    // },

    // optimismMainnet: {
    //   url: "https://mainnet.optimism.io",
    //   chainId : 10,
    //   accounts: {mnemonic : mnemonic},
    // },
    // bobaMainnet: {
    //   url: "https://mainnet.boba.network",
    //   chainId : 288,
    //   accounts: {mnemonic : mnemonic},
    // },
    // okcMainnet: {
    //   url: "https://exchainrpc.okex.org",
    //   chainId : 66,
    //   accounts: {mnemonic : mnemonic},
    // },
    // novaMainnet: {
    //   url: "https://nova.arbitrum.io/rpc",
    //   chainId : 42170,
    //   accounts: {mnemonic : mnemonic},
    // },
    // dogechain: {
    //   url: "https://rpc-sg.dogechain.dog",
    //   chainId : 2000,
    //   accounts: {mnemonic : mnemonic},
    // },
    // elysiumchain: {
    //   url: "https://elysium-test-rpc.vulcanforged.com",
    //   chainId : 1338,
    //   accounts: {mnemonic : mnemonic},
    // },
    // bobaAvaxchain: {
    //   url: "https://avax.boba.network",
    //   chainId : 43288,
    //   accounts: {mnemonic : mnemonic},
    // },
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
    //   accounts: {mnemonic : mnemonic},
    // },
    // avaxtestnet: {
    //   url: "https://api.avax-test.network/ext/bc/C/rpc",
    //   chainId : 43113,
    //   accounts: {mnemonic : mnemonic},
    // },
    // kcctestnet: {
    //   url: "https://rpc-testnet.kcc.network",
    //   chainId : 322,
    //   accounts: {mnemonic : mnemonic},
    // },
    // fantomtestnet: {
    //   url: "https://rpc.testnet.fantom.network",
    //   chainId : 4002,
    //   accounts: {mnemonic : mnemonic},
    // },
    // rinkebytestnet: {
    //   url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    //   chainId : 4,
    //   accounts: {mnemonic : mnemonic},
    // },
    // harmonytestnet: {
    //   url: "https://api.s0.b.hmny.io",
    //   chainId : 1666700000,
    //   accounts: {mnemonic : mnemonic},
    // },
    // metertestnet: {
    //   url: "https://rpctest.meter.io",
    //   chainId : 83,
    //   accounts: {mnemonic : mnemonic},
    // },

    // celotestnet: {
    //   url: "https://alfajores-forno.celo-testnet.org",
    //   chainId : 44787,
    //   accounts: {mnemonic : mnemonic},
    // },
    // abitrumtestnet: {
    //   url: "https://rinkeby.arbitrum.io/rpc",
    //   chainId : 421611,
    //   accounts: {mnemonic : mnemonic},
    // },
    // klaytntestnet: {
    //   url: "https://api.baobab.klaytn.net:8651",
    //   chainId : 1001,
    //   accounts: {mnemonic : mnemonic},
    // },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
  },
  etherscan: {
    // apiKey: "629EM9TX2HIJ2F39NIVY2FW37B1JN2METK" //bsc
    // apiKey: "6BE6VHTZAGQVY5MF7K3ZKF6K1556HMW68Z" //polygon
    // apiKey: "WBKAK9R22Y4WEDK4NH41DEEZBBY25AM5DK" //eth
    // apiKey: "PZUXVNQZ662DPURSEEZTGUG7GY2MBI853U"// opt
    apiKey: "RG54X18EJKVTVADRCD28FXQEY3Q7DJ6G4C"// arb
    // apiKey: ""// kcc
    // apiKey: "KXN1I8PNITSUARNZ398W4TV4W93YN8ZIY1"// ftm
    // apiKey: ""// avax

  },
};

export default config;
