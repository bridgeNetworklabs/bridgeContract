/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  FeeController,
  FeeControllerInterface,
} from "../../contracts/FeeController";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IController",
        name: "_controller",
        type: "address",
      },
      {
        internalType: "contract Isettings",
        name: "_settings",
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
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "AddressExemptionStatusChanged",
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
    name: "AssetIncentiveStatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newIncentive",
        type: "uint256",
      },
    ],
    name: "AssetIncentiveUpdated",
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
    name: "BrgHoldingIncentiveStatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prevBrgHoldingIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBrgHoldingIncentive",
        type: "uint256",
      },
    ],
    name: "BrgHoldingIncentiveUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prevBrgHoldingThreshold",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBrgHoldingThreshold",
        type: "uint256",
      },
    ],
    name: "BrgHoldingThresholdUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prevVal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newVal",
        type: "uint256",
      },
    ],
    name: "DefaultAssetIncentivePercentageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prevVal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newVal",
        type: "uint256",
      },
    ],
    name: "DefaultUserIncentivePercentageUpdated",
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
    name: "UserIncentiveStatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentIncentive",
        type: "uint256",
      },
    ],
    name: "UserIncentiveUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "exemptionStatus",
        type: "bool",
      },
    ],
    name: "userExemptStatusChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "activateAddressExemption",
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
    name: "activateAssetIncentive",
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
    name: "activateBRDGHoldingIncentive",
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
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "activateIndexedTokenIncentive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "activateIndexedUserIncentive",
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
    name: "activateUserIncentive",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "deActivateIndexedUserIncentive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultAssetIncentivePercentage",
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
    name: "defaultUserIncentivePercentage",
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
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "exemptAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "getBridgeFee",
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
    ],
    name: "indexedUserIncentive",
    outputs: [
      {
        internalType: "uint256",
        name: "incentivePercentage",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
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
    ],
    name: "isExempted",
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
    name: "settings",
    outputs: [
      {
        internalType: "contract Isettings",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "tokenHolderIncentive",
    outputs: [
      {
        internalType: "uint256",
        name: "incentivePercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "threshold",
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
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "percentage",
        type: "uint256",
      },
    ],
    name: "updatIndexedTokenIncentivePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenHoldingLevel",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
      },
    ],
    name: "updateBRDGHoldingIncentiveThreshold",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "percentage",
        type: "uint256",
      },
    ],
    name: "updateDefaultAssetIncentivePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "percentage",
        type: "uint256",
      },
    ],
    name: "updateDefaultUserIncentivePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenHoldingLevel",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "percentage",
        type: "uint256",
      },
    ],
    name: "updateTokenHoldingIncentivePercentage",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "percentage",
        type: "uint256",
      },
    ],
    name: "updateUserExemptionPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "useAssetIncentive",
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
    name: "useBRDGHoldingIncentive",
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
    name: "useExemption",
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
    name: "useUserIncentive",
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
];

const _bytecode =
  "0x60806040526521a7a6a6a7a760d11b600255634245544160e01b60035564414c50484160d81b600455600a600755600a6008553480156200003f57600080fd5b506040516200272838038062002728833981016040819052620000629162000094565b600080546001600160a01b039384166001600160a01b03199182161790915560018054929093169116179055620000eb565b60008060408385031215620000a7578182fd5b8251620000b481620000d2565b6020840151909250620000c781620000d2565b809150509250929050565b6001600160a01b0381168114620000e857600080fd5b50565b61262d80620000fb6000396000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c80639b9d2455116100de578063ba9527fe11610097578063e06174e411610071578063e06174e4146103af578063f2b80407146103da578063f2dcc1eb146103ed578063f77c4791146103f65761018e565b8063ba9527fe1461037c578063c00796051461038f578063c548d9b7146103a25761018e565b80639b9d2455146102e2578063a3019cf8146102f5578063aaddc3be14610308578063b306760d1461031b578063b43b5ebc1461032d578063b4f21e4d146103405761018e565b80633e8addf11161014b57806368a8d9f11161012557806368a8d9f11461026a57806368efca89146102a957806383c2a8da146102bc57806394018c4a146102cf5761018e565b80633e8addf1146102305780635ebbc33014610243578063632b7333146102565761018e565b806302a03d3614610193578063079eb7fb146101af57806308fdf610146101e257806312d5683d146101f757806322193f911461020a57806336a17d141461021d575b600080fd5b61019c60085481565b6040519081526020015b60405180910390f35b6101d26101bd366004612399565b60056020526000908152604090205460ff1681565b60405190151581526020016101a6565b6101f56101f03660046124b8565b610409565b005b6101f56102053660046124b8565b610744565b6101f5610218366004612468565b610a59565b6101f561022b366004612468565b610c05565b6101f561023e366004612399565b610da3565b6101f56102513660046124a0565b610f82565b6006546101d2906301000000900460ff1681565b610294610278366004612399565b600b602052600090815260409020805460019091015460ff1682565b604080519283529015156020830152016101a6565b6101f56102b7366004612468565b611122565b6101f56102ca36600461243d565b6112b6565b6101f56102dd366004612410565b6114b6565b6101f56102f0366004612468565b61167b565b6101f5610303366004612410565b611816565b6101f561031636600461243d565b611997565b6006546101d290610100900460ff1681565b6006546101d29062010000900460ff1681565b61036761034e3660046124a0565b6009602052600090815260409020805460019091015482565b604080519283526020830191909152016101a6565b61019c61038a3660046123d8565b611b8d565b6101f561039d3660046124a0565b611df3565b6006546101d29060ff1681565b6001546103c2906001600160a01b031681565b6040516001600160a01b0390911681526020016101a6565b6101f56103e8366004612399565b611f93565b61019c60075481565b6000546103c2906001600160a01b031681565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b15801561044d57600080fd5b505afa158015610461573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048591906123bc565b6001600160a01b031614806105105750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b1580156104d857600080fd5b505afa1580156104ec573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105109190612484565b6105355760405162461bcd60e51b815260040161052c906124f1565b60405180910390fd5b600254821480610546575060035482145b80610552575060045482145b61059a5760405162461bcd60e51b8152602060048201526019602482015278696e76616c696420686f6c64696e6720496e63656e7469766560381b604482015260640161052c565b60006105a58361216e565b905060045481141561061a57600354600090815260096020526040902060010154821180156105f757506002546000908152600960205260408082206001908101546003548452919092209091015410155b801561060c5750600254600052600960205260015b61061557600080fd5b6106e3565b60035481141561067f576004546000908152600960205260409020600101548210801561065a575060025460009081526009602052604090206001015482115b801561060c575060025460009081526009602052604090206001015461061557600080fd5b6002548114156106e357600354600090815260096020526040808220600190810154600454845291909220909101541180156106ce575060035460009081526009602052604090206001015482105b80156106da5750600082115b6106e357600080fd5b6000818152600960209081526040918290206001015482519081529081018490527f380370fc16cb5de7ba98c093cb2abe6e49cccb3e3f001e519ebcfe82f5cf139a910160405180910390a160009081526009602052604090206001015550565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b15801561078857600080fd5b505afa15801561079c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107c091906123bc565b6001600160a01b0316148061084b5750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b15801561081357600080fd5b505afa158015610827573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061084b9190612484565b6108675760405162461bcd60e51b815260040161052c906124f1565b600254821480610878575060035482145b80610884575060045482145b6108cc5760405162461bcd60e51b8152602060048201526019602482015278696e76616c696420686f6c64696e6720496e63656e7469766560381b604482015260640161052c565b60006108d78361216e565b60008181526009602052604090205460045491925090821415610956576003546000908152600960205260409020548311801561092c5750600254600090815260096020526040808220546003548352912054115b8015610948575060025460009081526009602052604090205415155b61095157600080fd5b610a08565b6003548214156109b1576004546000908152600960205260409020548310801561092c575060025460009081526009602052604090205483118015610948575060025460009081526009602052604090205461095157600080fd5b600254821415610a08576003546000908152600960205260408082205460045483529120541180156109f3575060035460009081526009602052604090205483105b80156109ff5750600083115b610a0857600080fd5b60008481526009602090815260409182902085905581518381529081018590527f240772d6994e765d6a8e5bdf73ae5fff4eb4de779e7ae3b36ae4f458f590b552910160405180910390a150505050565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b158015610a9d57600080fd5b505afa158015610ab1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ad591906123bc565b6001600160a01b03161480610b605750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b158015610b2857600080fd5b505afa158015610b3c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b609190612484565b610b7c5760405162461bcd60e51b815260040161052c906124f1565b60065460ff63010000009091041615158115151415610bad5760405162461bcd60e51b815260040161052c90612528565b6006805482151563010000000263ff000000199091161790556040517fe5184386e7442a96171dfb41f23bdc78158de15c8dd9203ba44911d1b970d4f990610bfa90831515815260200190565b60405180910390a150565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b158015610c4957600080fd5b505afa158015610c5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c8191906123bc565b6001600160a01b03161480610d0c5750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b158015610cd457600080fd5b505afa158015610ce8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d0c9190612484565b610d285760405162461bcd60e51b815260040161052c906124f1565b60065460ff620100009091041615158115151415610d585760405162461bcd60e51b815260040161052c90612528565b60068054821515620100000262ff0000199091161790556040517f91165ce3ea12d2f38c117706dca0cfdeefca89338a64dff731ab3c30a7b890e390610bfa90831515815260200190565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b158015610de757600080fd5b505afa158015610dfb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1f91906123bc565b6001600160a01b03161480610eaa5750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b158015610e7257600080fd5b505afa158015610e86573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eaa9190612484565b610ec65760405162461bcd60e51b815260040161052c906124f1565b6001600160a01b0381166000908152600b602052604090206001015460ff1615610f235760405162461bcd60e51b815260206004820152600e60248201526d616c72656164792061637469766560901b604482015260640161052c565b6001600160a01b0381166000818152600b60209081526040918290206001908101805460ff19168217905591519182527f4cc34974eb9acb4b7c62e2ce960332b3bde023d0004e5f0bdeee9c458cc2aa9891015b60405180910390a250565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b158015610fc657600080fd5b505afa158015610fda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ffe91906123bc565b6001600160a01b031614806110895750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b15801561105157600080fd5b505afa158015611065573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110899190612484565b6110a55760405162461bcd60e51b815260040161052c906124f1565b603281106110e15760405162461bcd60e51b8152602060048201526009602482015268696e76616c6964202560b81b604482015260640161052c565b60075460408051918252602082018390527faee9027cd52cd36ed373913dcea55a98babe1ff97f4a046828a3b177ea49c305910160405180910390a1600755565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b15801561116657600080fd5b505afa15801561117a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061119e91906123bc565b6001600160a01b031614806112295750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b1580156111f157600080fd5b505afa158015611205573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112299190612484565b6112455760405162461bcd60e51b815260040161052c906124f1565b60065460ff161515811515141561126e5760405162461bcd60e51b815260040161052c90612528565b60405181151581527fe41c88aff510062186556cad0aed9c7a0d4b346a62664358e69f4a40f43e9ca99060200160405180910390a16006805460ff1916911515919091179055565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b1580156112fa57600080fd5b505afa15801561130e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061133291906123bc565b6001600160a01b031614806113bd5750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b15801561138557600080fd5b505afa158015611399573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113bd9190612484565b6113d95760405162461bcd60e51b815260040161052c906124f1565b6001600160a01b0382166000908152600a602052604090206001015460ff166114565760405162461bcd60e51b815260206004820152602960248201527f466565436f6e74726f6c6c65723a206173736574206578656d7074696f6e206e6044820152686f742061637469766560b81b606482015260840161052c565b6001600160a01b0382166000818152600a6020908152604091829020805490859055825181815291820185905292917f2c4b2f302ea040ab407534b2d7cc4bc99334eb41a2b3f2c6f363fd0a1648f5d491015b60405180910390a2505050565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b1580156114fa57600080fd5b505afa15801561150e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061153291906123bc565b6001600160a01b031614806115bd5750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b15801561158557600080fd5b505afa158015611599573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115bd9190612484565b6115d95760405162461bcd60e51b815260040161052c906124f1565b6001600160a01b0382166000908152600a602052604090206001015460ff1615811515141561161a5760405162461bcd60e51b815260040161052c90612528565b6001600160a01b0382166000908152600a60209081526040918290206001908101805460ff191685151517905591519182527fe5184386e7442a96171dfb41f23bdc78158de15c8dd9203ba44911d1b970d4f9910160405180910390a15050565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b1580156116bf57600080fd5b505afa1580156116d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116f791906123bc565b6001600160a01b031614806117825750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b15801561174a57600080fd5b505afa15801561175e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117829190612484565b61179e5760405162461bcd60e51b815260040161052c906124f1565b60065460ff61010090910416151581151514156117cd5760405162461bcd60e51b815260040161052c90612528565b600680548215156101000261ff00199091161790556040517f4b35d602e0cd107e255cddff136a82aa52d7e52cbeb0add60ad2044ea6b1649190610bfa90831515815260200190565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b15801561185a57600080fd5b505afa15801561186e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061189291906123bc565b6001600160a01b0316146118e85760405162461bcd60e51b815260206004820152601860248201527f2063616c6c6572206973206e6f7420746865206f776e65720000000000000000604482015260640161052c565b6001600160a01b03821660009081526005602052604090205460ff16151581151514156119275760405162461bcd60e51b815260040161052c90612528565b816001600160a01b03167f4cc34974eb9acb4b7c62e2ce960332b3bde023d0004e5f0bdeee9c458cc2aa9882604051611964911515815260200190565b60405180910390a26001600160a01b03919091166000908152600560205260409020805460ff1916911515919091179055565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b1580156119db57600080fd5b505afa1580156119ef573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a1391906123bc565b6001600160a01b03161480611a9e5750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b158015611a6657600080fd5b505afa158015611a7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a9e9190612484565b611aba5760405162461bcd60e51b815260040161052c906124f1565b6001600160a01b0382166000908152600b602052604090206001015460ff16611b365760405162461bcd60e51b815260206004820152602860248201527f466565436f6e74726f6c6c65723a2075736572206578656d7074696f6e206e6f604482015267742061637469766560c01b606482015260840161052c565b6001600160a01b0382166000818152600b6020908152604091829020805490859055825181815291820185905292917f8d27423b5b97272ddd630edf11c97bddbc21ef3df22e50023ce38cb00d70244691016114a9565b60015460408051633199692b60e11b815290516000926001600160a01b031691636332d256916004808301926020929190829003018186803b158015611bd257600080fd5b505afa158015611be6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c0a9190612484565b611c1657506000611ded565b60015460408051638375bb3960e01b815290516000926001600160a01b031691638375bb39916004808301926020929190829003018186803b158015611c5b57600080fd5b505afa158015611c6f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c9391906124d9565b60065490915060009060ff168015611cc357506001600160a01b03851660009081526005602052604090205460ff165b15611cd357600092505050611ded565b60065462010000900460ff1615611d2e576001600160a01b0384166000908152600a602052604090206001015460ff1615611d2e576001600160a01b0384166000908152600a6020526040902054611d2b908261254d565b90505b6006546301000000900460ff1615611d8a576001600160a01b0385166000908152600b602052604090206001015460ff1615611d8a576001600160a01b0385166000908152600b6020526040902054611d87908261254d565b90505b600654610100900460ff1615611db5576000611da5866121aa565b9050611db1818361254d565b9150505b60648110611dc857600092505050611ded565b6064611dd48383612585565b611dde9190612565565b611de890836125a4565b925050505b92915050565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b158015611e3757600080fd5b505afa158015611e4b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e6f91906123bc565b6001600160a01b03161480611efa5750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b158015611ec257600080fd5b505afa158015611ed6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611efa9190612484565b611f165760405162461bcd60e51b815260040161052c906124f1565b60328110611f525760405162461bcd60e51b8152602060048201526009602482015268696e76616c6964202560b81b604482015260640161052c565b60085460408051918252602082018390527fb04bf79637ebb6d6a977766f7b02543d5d6607154feb1668c15e2c02c27ae047910160405180910390a1600855565b60005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b158015611fd757600080fd5b505afa158015611feb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061200f91906123bc565b6001600160a01b0316148061209a5750600054604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c9060240160206040518083038186803b15801561206257600080fd5b505afa158015612076573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061209a9190612484565b6120b65760405162461bcd60e51b815260040161052c906124f1565b6001600160a01b0381166000908152600b602052604090206001015460ff166121175760405162461bcd60e51b8152602060048201526013602482015272185b1c9958591e4819195858dd1a5d985d1959606a1b604482015260640161052c565b6001600160a01b0381166000818152600b602090815260408083206001908101805460ff19169091179055519182527f4cc34974eb9acb4b7c62e2ce960332b3bde023d0004e5f0bdeee9c458cc2aa989101610f77565b600060025482141561218357506002546121a5565b60035482141561219657506003546121a5565b60045482141561018e57506004545b919050565b600080600160009054906101000a90046001600160a01b03166001600160a01b0316635d911d126040518163ffffffff1660e01b815260040160206040518083038186803b1580156121fb57600080fd5b505afa15801561220f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061223391906123bc565b6040516370a0823160e01b81526001600160a01b03858116600483015291909116906370a082319060240160206040518083038186803b15801561227657600080fd5b505afa15801561228a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122ae91906124d9565b60045460009081526009602052604090206001015490915081106122e55750506004546000908152600960205260409020546121a5565b6004546000908152600960205260409020600101548110801561231c57506003546000908152600960205260409020600101548110155b1561233a5750506003546000908152600960205260409020546121a5565b6003546000908152600960205260409020600101548110801561237157506002546000908152600960205260409020600101548110155b1561238f5750506002546000908152600960205260409020546121a5565b60009150506121a5565b6000602082840312156123aa578081fd5b81356123b5816125d1565b9392505050565b6000602082840312156123cd578081fd5b81516123b5816125d1565b600080604083850312156123ea578081fd5b82356123f5816125d1565b91506020830135612405816125d1565b809150509250929050565b60008060408385031215612422578182fd5b823561242d816125d1565b91506020830135612405816125e9565b6000806040838503121561244f578182fd5b823561245a816125d1565b946020939093013593505050565b600060208284031215612479578081fd5b81356123b5816125e9565b600060208284031215612495578081fd5b81516123b5816125e9565b6000602082840312156124b1578081fd5b5035919050565b600080604083850312156124ca578182fd5b50508035926020909101359150565b6000602082840312156124ea578081fd5b5051919050565b60208082526018908201527f2063616c6c6572206973206e6f74207468652061646d696e0000000000000000604082015260600190565b6020808252600b908201526a185b1c9958591e481cd95d60aa1b604082015260600190565b60008219821115612560576125606125bb565b500190565b60008261258057634e487b7160e01b81526012600452602481fd5b500490565b600081600019048311821515161561259f5761259f6125bb565b500290565b6000828210156125b6576125b66125bb565b500390565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b03811681146125e657600080fd5b50565b80151581146125e657600080fdfea26469706673582212203873493619d2e6dd8ab73325df24a44972696b2fc8e93cfaae424ae2aceff76364736f6c63430008020033";

type FeeControllerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FeeControllerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FeeController__factory extends ContractFactory {
  constructor(...args: FeeControllerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _controller: PromiseOrValue<string>,
    _settings: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FeeController> {
    return super.deploy(
      _controller,
      _settings,
      overrides || {}
    ) as Promise<FeeController>;
  }
  override getDeployTransaction(
    _controller: PromiseOrValue<string>,
    _settings: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_controller, _settings, overrides || {});
  }
  override attach(address: string): FeeController {
    return super.attach(address) as FeeController;
  }
  override connect(signer: Signer): FeeController__factory {
    return super.connect(signer) as FeeController__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FeeControllerInterface {
    return new utils.Interface(_abi) as FeeControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FeeController {
    return new Contract(address, _abi, signerOrProvider) as FeeController;
  }
}
