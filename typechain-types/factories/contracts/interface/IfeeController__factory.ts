/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IfeeController,
  IfeeControllerInterface,
} from "../../../contracts/interface/IfeeController";

const _abi = [
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
];

export class IfeeController__factory {
  static readonly abi = _abi;
  static createInterface(): IfeeControllerInterface {
    return new utils.Interface(_abi) as IfeeControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IfeeController {
    return new Contract(address, _abi, signerOrProvider) as IfeeController;
  }
}