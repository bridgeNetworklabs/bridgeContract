/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "Bridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Bridge__factory>;
    getContractFactory(
      name: "BridgePool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BridgePool__factory>;
    getContractFactory(
      name: "BridgeSocket",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BridgeSocket__factory>;
    getContractFactory(
      name: "Controller",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Controller__factory>;
    getContractFactory(
      name: "Deployer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Deployer__factory>;
    getContractFactory(
      name: "FeeController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FeeController__factory>;
    getContractFactory(
      name: "Ibridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ibridge__factory>;
    getContractFactory(
      name: "IbridgeMigrator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IbridgeMigrator__factory>;
    getContractFactory(
      name: "IbridgePool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IbridgePool__factory>;
    getContractFactory(
      name: "IController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IController__factory>;
    getContractFactory(
      name: "Ideployer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ideployer__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IwrappedToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IwrappedToken__factory>;
    getContractFactory(
      name: "IERCOwnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERCOwnable__factory>;
    getContractFactory(
      name: "IfeeController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IfeeController__factory>;
    getContractFactory(
      name: "ILERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILERC20__factory>;
    getContractFactory(
      name: "ILssController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILssController__factory>;
    getContractFactory(
      name: "ILssGovernance",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILssGovernance__factory>;
    getContractFactory(
      name: "ILssReporting",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILssReporting__factory>;
    getContractFactory(
      name: "ILssStaking",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILssStaking__factory>;
    getContractFactory(
      name: "LERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LERC20__factory>;
    getContractFactory(
      name: "ProtectionStrategy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ProtectionStrategy__factory>;
    getContractFactory(
      name: "IRegistery",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRegistery__factory>;
    getContractFactory(
      name: "Isettings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Isettings__factory>;
    getContractFactory(
      name: "IwrappedToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IwrappedToken__factory>;
    getContractFactory(
      name: "Registry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Registry__factory>;
    getContractFactory(
      name: "Settings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Settings__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "TestToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestToken__factory>;
    getContractFactory(
      name: "Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Token__factory>;
    getContractFactory(
      name: "BasicToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BasicToken__factory>;
    getContractFactory(
      name: "BlackList",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BlackList__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Basic",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Basic__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "StandardToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StandardToken__factory>;
    getContractFactory(
      name: "TetherToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TetherToken__factory>;
    getContractFactory(
      name: "UpgradedStandardToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UpgradedStandardToken__factory>;
    getContractFactory(
      name: "WrappedToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WrappedToken__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Permit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Permit>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "Bridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Bridge>;
    getContractAt(
      name: "BridgePool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BridgePool>;
    getContractAt(
      name: "BridgeSocket",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BridgeSocket>;
    getContractAt(
      name: "Controller",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Controller>;
    getContractAt(
      name: "Deployer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Deployer>;
    getContractAt(
      name: "FeeController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FeeController>;
    getContractAt(
      name: "Ibridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ibridge>;
    getContractAt(
      name: "IbridgeMigrator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IbridgeMigrator>;
    getContractAt(
      name: "IbridgePool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IbridgePool>;
    getContractAt(
      name: "IController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IController>;
    getContractAt(
      name: "Ideployer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ideployer>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IwrappedToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IwrappedToken>;
    getContractAt(
      name: "IERCOwnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERCOwnable>;
    getContractAt(
      name: "IfeeController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IfeeController>;
    getContractAt(
      name: "ILERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILERC20>;
    getContractAt(
      name: "ILssController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILssController>;
    getContractAt(
      name: "ILssGovernance",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILssGovernance>;
    getContractAt(
      name: "ILssReporting",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILssReporting>;
    getContractAt(
      name: "ILssStaking",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILssStaking>;
    getContractAt(
      name: "LERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LERC20>;
    getContractAt(
      name: "ProtectionStrategy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ProtectionStrategy>;
    getContractAt(
      name: "IRegistery",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRegistery>;
    getContractAt(
      name: "Isettings",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Isettings>;
    getContractAt(
      name: "IwrappedToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IwrappedToken>;
    getContractAt(
      name: "Registry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Registry>;
    getContractAt(
      name: "Settings",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Settings>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "TestToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestToken>;
    getContractAt(
      name: "Token",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Token>;
    getContractAt(
      name: "BasicToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BasicToken>;
    getContractAt(
      name: "BlackList",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BlackList>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Basic",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Basic>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "StandardToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StandardToken>;
    getContractAt(
      name: "TetherToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TetherToken>;
    getContractAt(
      name: "UpgradedStandardToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UpgradedStandardToken>;
    getContractAt(
      name: "WrappedToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WrappedToken>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
