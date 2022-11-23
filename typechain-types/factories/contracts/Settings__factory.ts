/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Settings, SettingsInterface } from "../../contracts/Settings";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IController",
        name: "_controller",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_feeRemitance",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_gasBank",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "ApprovedToAdd",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prevValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "BaseFeePercentageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "baseFeeEnable",
        type: "bool",
      },
    ],
    name: "BaseFeeStatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "prevValue",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newValue",
        type: "address",
      },
    ],
    name: "BrdgTokenUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "prevValue",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newValue",
        type: "address",
      },
    ],
    name: "FeeRemitanceAddressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "prevValue",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newValue",
        type: "address",
      },
    ],
    name: "GasBankUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prevMinValidationPercentage",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newMinValidationPercentage",
        type: "uint256",
      },
    ],
    name: "MinValidationPercentageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "prevValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "NetworkGasUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "chains",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isadded",
        type: "bool",
      },
    ],
    name: "NetworkSupportedChainsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "OnlyOwnableRailStateEnabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prevValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "RailOwnerFeeShareUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prevValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "RailRegistrationFeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "UpdatableAssetStateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prevValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "minWithdrawableFeeUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "ValidationPercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "approvedToAdd",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseFeeEnable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseFeePercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "brgToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "controller",
    outputs: [
      {
        internalType: "contract IController",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enableBaseFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRemitance",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gasBank",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNetworkSupportedChains",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "isNetworkSupportedChain",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxFeeThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minValidationPercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minValidations",
    outputs: [
      {
        internalType: "uint256",
        name: "minvalidation",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minWithdrawableFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "networkGas",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "networkSupportedChains",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "onlyOwnableRail",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "railOwnerFeeShare",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "railRegistrationFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "setApprovedToAdd",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "account",
        type: "address",
      },
    ],
    name: "setFeeRemitanceAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_gasBank",
        type: "address",
      },
    ],
    name: "setGasBank",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ValidationPercentage",
        type: "uint256",
      },
    ],
    name: "setMinValidationPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "chains",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "fees",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "addchain",
        type: "bool",
      },
    ],
    name: "setNetworkSupportedChains",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "setOnlyOwnableRailState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "share",
        type: "uint256",
      },
    ],
    name: "setRailOwnerFeeShare",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "setUpdatableAssetState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_base",
        type: "uint256",
      },
    ],
    name: "setbaseFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "setbrgToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minWithdrawableFee",
        type: "uint256",
      },
    ],
    name: "setminWithdrawableFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "registrationFee",
        type: "uint256",
      },
    ],
    name: "setrailRegistrationFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updatableAssetState",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "updateNetworkGas",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405269010f0cf064dd59200000600455601460055567016345785d8a00006006556103e860075560336008556009805461ff001960ff1990911660011716610100179055600a600b553480156200005857600080fd5b5060405162001d7638038062001d768339810160408190526200007b91620000be565b600080546001600160a01b039485166001600160a01b0319918216179091556002805493851693821693909317909255600380549190931691161790556200012a565b600080600060608486031215620000d3578283fd5b8351620000e08162000111565b6020850151909350620000f38162000111565b6040850151909250620001068162000111565b809150509250925092565b6001600160a01b03811681146200012757600080fd5b50565b611c3c806200013a6000396000f3fe608060405234801561001057600080fd5b50600436106102065760003560e01c80636393fa8c1161011a578063a02ac88d116100ad578063dea04ce21161007c578063dea04ce214610428578063df73eb511461043b578063e05d361e1461045e578063f24356431461048c578063f77c47911461049557610206565b8063a02ac88d146103e6578063b454a52e146103f9578063b8e7f79b1461040c578063cfb83caf1461041557610206565b80637e9d69b1116100e95780637e9d69b1146103ba5780638375bb39146103c25780639704979a146103cb578063993a4349146103d357610206565b80636393fa8c1461037f578063680038c714610392578063726a866f1461039a578063750eeb0c146103ad57610206565b806335428cea1161019d57806356212e481161016c57806356212e481461031257806356f8fcaa1461031b57806357b720221461032e5780635d911d12146103595780636332d2561461037257610206565b806335428cea146102b7578063384ede80146102ca5780634983d302146102ec578063511fa843146102ff57610206565b806319b9cd6e116101d957806319b9cd6e14610275578063233d64691461027e57806323b00cd41461029157806327c8905c146102a457610206565b8063050e12c81461020b5780630608fd5014610220578063090c76271461023e57806315596cee14610255575b600080fd5b61021e610219366004611a06565b6104a8565b005b61022861051c565b6040516102359190611a91565b60405180910390f35b61024760065481565b604051908152602001610235565b610247610263366004611a06565b60016020526000908152604090205481565b61024760045481565b61021e61028c36600461191a565b610574565b61021e61029f366004611a36565b61066e565b61021e6102b2366004611a06565b610753565b61021e6102c5366004611a06565b6107ea565b6009546102dc90610100900460ff1681565b6040519015158152602001610235565b61021e6102fa366004611964565b61091d565b61021e61030d3660046118a3565b610e08565b61024760075481565b61021e6103293660046118a3565b610f6c565b600254610341906001600160a01b031681565b6040516001600160a01b039091168152602001610235565b600954610341906201000090046001600160a01b031681565b600c546102dc9060ff1681565b61021e61038d366004611a06565b610ffa565b61024761107e565b600354610341906001600160a01b031681565b6009546102dc9060ff1681565b610247603381565b610247600b5481565b61021e6111c7565b61021e6103e13660046118a3565b6112cd565b61021e6103f4366004611a06565b611432565b610247610407366004611a06565b6115aa565b61024760085481565b61021e6104233660046119ce565b6115cb565b61021e6104363660046119ce565b611655565b6102dc610449366004611a06565b600d6020526000908152604090205460ff1681565b6102dc61046c3660046118e2565b600e60209081526000928352604080842090915290825290205460ff1681565b61024760055481565b600054610341906001600160a01b031681565b6104b06116ce565b8060045414156104db5760405162461bcd60e51b81526004016104d290611ae8565b60405180910390fd5b60045460408051918252602082018390527f76c79750aff2ab427a03f725628a940f6b1094f555be4f84faa828ad3a2561b0910160405180910390a1600455565b6060600a80548060200260200160405190810160405280929190818152602001828054801561056a57602002820191906000526020600020905b815481526020019060010190808311610556575b5050505050905090565b61057c6116ce565b6001600160a01b038083166000908152600e602090815260408083209387168352929052205460ff16151581151514156105e65760405162461bcd60e51b815260206004820152600b60248201526a73616d652073746174757360a81b60448201526064016104d2565b826001600160a01b0316826001600160a01b03167f8f7abf0a3b514916cf6dbf79c81bc28f706f76b687e04b629c2df0e026ba21b98360405161062d911515815260200190565b60405180910390a36001600160a01b039182166000908152600e60209081526040808320959094168252939093529120805460ff1916911515919091179055565b6106766116ce565b6000828152600160205260409020548114156106a45760405162461bcd60e51b81526004016104d290611ae8565b6000828152600d602052604090205460ff166106f25760405162461bcd60e51b815260206004820152600d60248201526c1b9bdd0814dd5c1c1bdc9d1959609a1b60448201526064016104d2565b600082815260016020908152604091829020548251858152918201529081018290527fb14b1c601970e336465291d1cfac778ca6351406b0bce90337599f53c1d704049060600160405180910390a160009182526001602052604090912055565b61075b6116ce565b80600554141561077d5760405162461bcd60e51b81526004016104d290611ae8565b60018111801561078d5750606481105b6107a95760405162461bcd60e51b81526004016104d290611b26565b60055460408051918252602082018390527f6804b187adb661f936e86f4f24c9ca3778dc18aae058e94509fae33daaaeffe3910160405180910390a1600555565b60008054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561083657600080fd5b505afa15801561084a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061086e91906118c6565b6001600160a01b0316336001600160a01b03161461089e5760405162461bcd60e51b81526004016104d290611b09565b6103e881106108dc5760405162461bcd60e51b815260206004820152600a6024820152696578636565642031302560b01b60448201526064016104d2565b600b5460408051918252602082018390527f6d2c65b44bc63fd2829f145cdd873168f1a8c31677f2c94bbf3dc01858e6adf8910160405180910390a1600b55565b6109256116ce565b825182514691908315610bb75780821461096b5760405162461bcd60e51b81526020600482015260076024820152661a5b9d985b1a5960ca1b60448201526064016104d2565b60005b82811015610bb157600d600088838151811061099a57634e487b7160e01b600052603260045260246000fd5b60209081029190910181015182528101919091526040016000205460ff161580156109ec5750838782815181106109e157634e487b7160e01b600052603260045260246000fd5b602002602001015114155b15610af157600a878281518110610a1357634e487b7160e01b600052603260045260246000fd5b6020908102919091018101518254600181810185556000948552928420015588519091600d918a9085908110610a5957634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002060006101000a81548160ff021916908315150217905550858181518110610aa657634e487b7160e01b600052603260045260246000fd5b602002602001015160016000898481518110610ad257634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002081905550610b9f565b600d6000888381518110610b1557634e487b7160e01b600052603260045260246000fd5b60209081029190910181015182528101919091526040016000205460ff1615610b9f57858181518110610b5857634e487b7160e01b600052603260045260246000fd5b602002602001015160016000898481518110610b8457634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020819055505b80610ba981611b99565b91505061096e565b50610dc7565b60005b82811015610dc557600d6000888381518110610be657634e487b7160e01b600052603260045260246000fd5b60209081029190910181015182528101919091526040016000205460ff1615610db35760005b600a54811015610d1e57878281518110610c3657634e487b7160e01b600052603260045260246000fd5b6020026020010151600a8281548110610c5f57634e487b7160e01b600052603260045260246000fd5b90600052602060002001541415610d0c57600a8054610c8090600190611b82565b81548110610c9e57634e487b7160e01b600052603260045260246000fd5b9060005260206000200154600a8281548110610cca57634e487b7160e01b600052603260045260246000fd5b600091825260209091200155600a805480610cf557634e487b7160e01b600052603160045260246000fd5b600190038181906000526020600020016000905590555b80610d1681611b99565b915050610c0c565b50600060016000898481518110610d4557634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020819055506000600d6000898481518110610d8557634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002060006101000a81548160ff0219169083151502179055505b80610dbd81611b99565b915050610bba565b505b7f12dae3fa7728ef96cb40d23f3a836b7ee3659e0cf0c86fe4a9fde6440785635c8685604051610df8929190611aa4565b60405180910390a1505050505050565b60008054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610e5457600080fd5b505afa158015610e68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e8c91906118c6565b6001600160a01b0316336001600160a01b031614610ebc5760405162461bcd60e51b81526004016104d290611b09565b6001600160a01b038116610ee25760405162461bcd60e51b81526004016104d290611ac8565b6002546001600160a01b0382811691161415610f105760405162461bcd60e51b81526004016104d290611b26565b6002546040516001600160a01b038084169216907fa0ccaf7086c55de674e8fda4d98490ef51727243fec2c21151a5c7e610efbf1c90600090a3600280546001600160a01b0319166001600160a01b0392909216919091179055565b610f746116ce565b6001600160a01b038116610f9a5760405162461bcd60e51b81526004016104d290611ac8565b6040516001600160a01b0382169081907f333e474f308ecf374d0dc4e79756700bca8ca801fda9ea2ebe059a188bd6013690600090a3600980546001600160a01b03909216620100000262010000600160b01b0319909216919091179055565b6110026116ce565b6000811161103d5760405162461bcd60e51b81526020600482015260086024820152673b30b63ab2a2a92960c11b60448201526064016104d2565b60065460408051918252602082018390527f56fbdd2053e5f632f3c1af08630b1998ca3c6499041cd1eb0e82df74c9b88b7e910160405180910390a1600655565b60008060085460646110909190611b82565b9050600060648260008054906101000a90046001600160a01b03166001600160a01b031663ed612f8c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156110e357600080fd5b505afa1580156110f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061111b9190611a1e565b6111259190611b63565b61112f9190611b43565b90508060008054906101000a90046001600160a01b03166001600160a01b031663ed612f8c6040518163ffffffff1660e01b815260040160206040518083038186803b15801561117e57600080fd5b505afa158015611192573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111b69190611a1e565b6111c09190611b82565b9250505090565b60008054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561121357600080fd5b505afa158015611227573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061124b91906118c6565b6001600160a01b0316336001600160a01b03161461127b5760405162461bcd60e51b81526004016104d290611b09565b600c805460ff19811660ff9182161517918290556040517f635f3df7f066e1fc507afd1ac131cfa3ff8ae69396ce1020b1b43132ee920aa0926112c392161515815260200190565b60405180910390a1565b60008054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561131957600080fd5b505afa15801561132d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061135191906118c6565b6001600160a01b0316336001600160a01b0316146113815760405162461bcd60e51b81526004016104d290611b09565b6001600160a01b0381166113a75760405162461bcd60e51b81526004016104d290611ac8565b6003546001600160a01b03828116911614156113d55760405162461bcd60e51b81526004016104d290611b26565b6003546040516001600160a01b03918216918316907fd5b32c9b2106e6cb3da609af535154d42e19ff8f28c3581445a8968853aad45090600090a3600380546001600160a01b0319166001600160a01b0392909216919091179055565b60008054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561147e57600080fd5b505afa158015611492573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114b691906118c6565b6001600160a01b0316336001600160a01b0316146114e65760405162461bcd60e51b81526004016104d290611b09565b6008548114156115215760405162461bcd60e51b81526004016104d29060208082526004908201526373616d6560e01b604082015260600190565b603381118015611532575060648111155b6115695760405162461bcd60e51b81526020600482015260086024820152673b30b63ab2a2a92960c11b60448201526064016104d2565b60085460408051918252602082018390527fca1f811b4ab994e3dda7a401f10d3589273467857d2e8b6aef2be379a4eafd8d910160405180910390a1600855565b600a81815481106115ba57600080fd5b600091825260209091200154905081565b6115d36116ce565b600960019054906101000a900460ff16151581151514156116065760405162461bcd60e51b81526004016104d290611b26565b60405181151581527f4e5b0e0298ea038b58d8630b774d93d4dab4d7674347e5642a4a199748e98d699060200160405180910390a1600980549115156101000261ff0019909216919091179055565b61165d6116ce565b60095460ff16151581151514156116865760405162461bcd60e51b81526004016104d290611b26565b60405181151581527fec8e41691115be60c8e63c12a18d407edffc99655412b4ed215430d3b40c727f9060200160405180910390a16009805460ff1916911515919091179055565b600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b15801561171157600080fd5b505afa158015611725573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061174991906119ea565b806117e8575060008054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561179b57600080fd5b505afa1580156117af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117d391906118c6565b6001600160a01b0316336001600160a01b0316145b6118045760405162461bcd60e51b81526004016104d290611b09565b565b600082601f830112611816578081fd5b8135602067ffffffffffffffff8083111561183357611833611bca565b818302604051601f19603f8301168101818110848211171561185757611857611bca565b60405284815283810192508684018288018501891015611875578687fd5b8692505b85831015611897578035845292840192600192909201918401611879565b50979650505050505050565b6000602082840312156118b4578081fd5b81356118bf81611be0565b9392505050565b6000602082840312156118d7578081fd5b81516118bf81611be0565b600080604083850312156118f4578081fd5b82356118ff81611be0565b9150602083013561190f81611be0565b809150509250929050565b60008060006060848603121561192e578081fd5b833561193981611be0565b9250602084013561194981611be0565b9150604084013561195981611bf8565b809150509250925092565b600080600060608486031215611978578283fd5b833567ffffffffffffffff8082111561198f578485fd5b61199b87838801611806565b945060208601359150808211156119b0578384fd5b506119bd86828701611806565b925050604084013561195981611bf8565b6000602082840312156119df578081fd5b81356118bf81611bf8565b6000602082840312156119fb578081fd5b81516118bf81611bf8565b600060208284031215611a17578081fd5b5035919050565b600060208284031215611a2f578081fd5b5051919050565b60008060408385031215611a48578182fd5b50508035926020909101359150565b6000815180845260208085019450808401835b83811015611a8657815187529582019590820190600101611a6a565b509495945050505050565b6000602082526118bf6020830184611a57565b600060408252611ab76040830185611a57565b905082151560208301529392505050565b6020808252600690820152657a65726f5f4160d01b604082015260600190565b6020808252600790820152661cd85b5955985b60ca1b604082015260600190565b602080825260039082015262555f4160e81b604082015260600190565b60208082526003908201526232b93960e91b604082015260600190565b600082611b5e57634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615611b7d57611b7d611bb4565b500290565b600082821015611b9457611b94611bb4565b500390565b6000600019821415611bad57611bad611bb4565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114611bf557600080fd5b50565b8015158114611bf557600080fdfea26469706673582212207c94e7f4da27ceabc375639d65f401bb41d393971f3c8f497fa86219f5092cc064736f6c63430008020033";

type SettingsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SettingsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Settings__factory extends ContractFactory {
  constructor(...args: SettingsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _controller: PromiseOrValue<string>,
    _feeRemitance: PromiseOrValue<string>,
    _gasBank: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Settings> {
    return super.deploy(
      _controller,
      _feeRemitance,
      _gasBank,
      overrides || {}
    ) as Promise<Settings>;
  }
  override getDeployTransaction(
    _controller: PromiseOrValue<string>,
    _feeRemitance: PromiseOrValue<string>,
    _gasBank: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _controller,
      _feeRemitance,
      _gasBank,
      overrides || {}
    );
  }
  override attach(address: string): Settings {
    return super.attach(address) as Settings;
  }
  override connect(signer: Signer): Settings__factory {
    return super.connect(signer) as Settings__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SettingsInterface {
    return new utils.Interface(_abi) as SettingsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Settings {
    return new Contract(address, _abi, signerOrProvider) as Settings;
  }
}
