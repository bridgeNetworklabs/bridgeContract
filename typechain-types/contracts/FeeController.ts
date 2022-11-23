/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface FeeControllerInterface extends utils.Interface {
  functions: {
    "activateAddressExemption(bool)": FunctionFragment;
    "activateAssetIncentive(bool)": FunctionFragment;
    "activateBRDGHoldingIncentive(bool)": FunctionFragment;
    "activateIndexedTokenIncentive(address,bool)": FunctionFragment;
    "activateIndexedUserIncentive(address)": FunctionFragment;
    "activateUserIncentive(bool)": FunctionFragment;
    "controller()": FunctionFragment;
    "deActivateIndexedUserIncentive(address)": FunctionFragment;
    "defaultAssetIncentivePercentage()": FunctionFragment;
    "defaultUserIncentivePercentage()": FunctionFragment;
    "exemptAddress(address,bool)": FunctionFragment;
    "getBridgeFee(address,address)": FunctionFragment;
    "indexedUserIncentive(address)": FunctionFragment;
    "isExempted(address)": FunctionFragment;
    "settings()": FunctionFragment;
    "tokenHolderIncentive(bytes32)": FunctionFragment;
    "updatIndexedTokenIncentivePercentage(address,uint256)": FunctionFragment;
    "updateBRDGHoldingIncentiveThreshold(bytes32,uint256)": FunctionFragment;
    "updateDefaultAssetIncentivePercentage(uint256)": FunctionFragment;
    "updateDefaultUserIncentivePercentage(uint256)": FunctionFragment;
    "updateTokenHoldingIncentivePercentage(bytes32,uint256)": FunctionFragment;
    "updateUserExemptionPercentage(address,uint256)": FunctionFragment;
    "useAssetIncentive()": FunctionFragment;
    "useBRDGHoldingIncentive()": FunctionFragment;
    "useExemption()": FunctionFragment;
    "useUserIncentive()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "activateAddressExemption"
      | "activateAssetIncentive"
      | "activateBRDGHoldingIncentive"
      | "activateIndexedTokenIncentive"
      | "activateIndexedUserIncentive"
      | "activateUserIncentive"
      | "controller"
      | "deActivateIndexedUserIncentive"
      | "defaultAssetIncentivePercentage"
      | "defaultUserIncentivePercentage"
      | "exemptAddress"
      | "getBridgeFee"
      | "indexedUserIncentive"
      | "isExempted"
      | "settings"
      | "tokenHolderIncentive"
      | "updatIndexedTokenIncentivePercentage"
      | "updateBRDGHoldingIncentiveThreshold"
      | "updateDefaultAssetIncentivePercentage"
      | "updateDefaultUserIncentivePercentage"
      | "updateTokenHoldingIncentivePercentage"
      | "updateUserExemptionPercentage"
      | "useAssetIncentive"
      | "useBRDGHoldingIncentive"
      | "useExemption"
      | "useUserIncentive"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "activateAddressExemption",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "activateAssetIncentive",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "activateBRDGHoldingIncentive",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "activateIndexedTokenIncentive",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "activateIndexedUserIncentive",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "activateUserIncentive",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "controller",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deActivateIndexedUserIncentive",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "defaultAssetIncentivePercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "defaultUserIncentivePercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "exemptAddress",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "getBridgeFee",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "indexedUserIncentive",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isExempted",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "settings", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenHolderIncentive",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "updatIndexedTokenIncentivePercentage",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateBRDGHoldingIncentiveThreshold",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateDefaultAssetIncentivePercentage",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateDefaultUserIncentivePercentage",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateTokenHoldingIncentivePercentage",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateUserExemptionPercentage",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "useAssetIncentive",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "useBRDGHoldingIncentive",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "useExemption",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "useUserIncentive",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "activateAddressExemption",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "activateAssetIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "activateBRDGHoldingIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "activateIndexedTokenIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "activateIndexedUserIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "activateUserIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "controller", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deActivateIndexedUserIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defaultAssetIncentivePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defaultUserIncentivePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exemptAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBridgeFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "indexedUserIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isExempted", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "settings", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenHolderIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatIndexedTokenIncentivePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateBRDGHoldingIncentiveThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateDefaultAssetIncentivePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateDefaultUserIncentivePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateTokenHoldingIncentivePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateUserExemptionPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "useAssetIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "useBRDGHoldingIncentive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "useExemption",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "useUserIncentive",
    data: BytesLike
  ): Result;

  events: {
    "AddressExemptionStatusChanged(bool)": EventFragment;
    "AssetIncentiveStatusChanged(bool)": EventFragment;
    "AssetIncentiveUpdated(address,uint256,uint256)": EventFragment;
    "BrgHoldingIncentiveStatusChanged(bool)": EventFragment;
    "BrgHoldingIncentiveUpdated(uint256,uint256)": EventFragment;
    "BrgHoldingThresholdUpdated(uint256,uint256)": EventFragment;
    "DefaultAssetIncentivePercentageUpdated(uint256,uint256)": EventFragment;
    "DefaultUserIncentivePercentageUpdated(uint256,uint256)": EventFragment;
    "UserIncentiveStatusChanged(bool)": EventFragment;
    "UserIncentiveUpdate(address,uint256,uint256)": EventFragment;
    "userExemptStatusChanged(address,bool)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "AddressExemptionStatusChanged"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "AssetIncentiveStatusChanged"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetIncentiveUpdated"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "BrgHoldingIncentiveStatusChanged"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BrgHoldingIncentiveUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BrgHoldingThresholdUpdated"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "DefaultAssetIncentivePercentageUpdated"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "DefaultUserIncentivePercentageUpdated"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UserIncentiveStatusChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UserIncentiveUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "userExemptStatusChanged"): EventFragment;
}

export interface AddressExemptionStatusChangedEventObject {
  status: boolean;
}
export type AddressExemptionStatusChangedEvent = TypedEvent<
  [boolean],
  AddressExemptionStatusChangedEventObject
>;

export type AddressExemptionStatusChangedEventFilter =
  TypedEventFilter<AddressExemptionStatusChangedEvent>;

export interface AssetIncentiveStatusChangedEventObject {
  status: boolean;
}
export type AssetIncentiveStatusChangedEvent = TypedEvent<
  [boolean],
  AssetIncentiveStatusChangedEventObject
>;

export type AssetIncentiveStatusChangedEventFilter =
  TypedEventFilter<AssetIncentiveStatusChangedEvent>;

export interface AssetIncentiveUpdatedEventObject {
  asset: string;
  oldIncentive: BigNumber;
  newIncentive: BigNumber;
}
export type AssetIncentiveUpdatedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  AssetIncentiveUpdatedEventObject
>;

export type AssetIncentiveUpdatedEventFilter =
  TypedEventFilter<AssetIncentiveUpdatedEvent>;

export interface BrgHoldingIncentiveStatusChangedEventObject {
  status: boolean;
}
export type BrgHoldingIncentiveStatusChangedEvent = TypedEvent<
  [boolean],
  BrgHoldingIncentiveStatusChangedEventObject
>;

export type BrgHoldingIncentiveStatusChangedEventFilter =
  TypedEventFilter<BrgHoldingIncentiveStatusChangedEvent>;

export interface BrgHoldingIncentiveUpdatedEventObject {
  prevBrgHoldingIncentive: BigNumber;
  newBrgHoldingIncentive: BigNumber;
}
export type BrgHoldingIncentiveUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  BrgHoldingIncentiveUpdatedEventObject
>;

export type BrgHoldingIncentiveUpdatedEventFilter =
  TypedEventFilter<BrgHoldingIncentiveUpdatedEvent>;

export interface BrgHoldingThresholdUpdatedEventObject {
  prevBrgHoldingThreshold: BigNumber;
  newBrgHoldingThreshold: BigNumber;
}
export type BrgHoldingThresholdUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  BrgHoldingThresholdUpdatedEventObject
>;

export type BrgHoldingThresholdUpdatedEventFilter =
  TypedEventFilter<BrgHoldingThresholdUpdatedEvent>;

export interface DefaultAssetIncentivePercentageUpdatedEventObject {
  prevVal: BigNumber;
  newVal: BigNumber;
}
export type DefaultAssetIncentivePercentageUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  DefaultAssetIncentivePercentageUpdatedEventObject
>;

export type DefaultAssetIncentivePercentageUpdatedEventFilter =
  TypedEventFilter<DefaultAssetIncentivePercentageUpdatedEvent>;

export interface DefaultUserIncentivePercentageUpdatedEventObject {
  prevVal: BigNumber;
  newVal: BigNumber;
}
export type DefaultUserIncentivePercentageUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  DefaultUserIncentivePercentageUpdatedEventObject
>;

export type DefaultUserIncentivePercentageUpdatedEventFilter =
  TypedEventFilter<DefaultUserIncentivePercentageUpdatedEvent>;

export interface UserIncentiveStatusChangedEventObject {
  status: boolean;
}
export type UserIncentiveStatusChangedEvent = TypedEvent<
  [boolean],
  UserIncentiveStatusChangedEventObject
>;

export type UserIncentiveStatusChangedEventFilter =
  TypedEventFilter<UserIncentiveStatusChangedEvent>;

export interface UserIncentiveUpdateEventObject {
  user: string;
  previousIncentive: BigNumber;
  currentIncentive: BigNumber;
}
export type UserIncentiveUpdateEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  UserIncentiveUpdateEventObject
>;

export type UserIncentiveUpdateEventFilter =
  TypedEventFilter<UserIncentiveUpdateEvent>;

export interface userExemptStatusChangedEventObject {
  user: string;
  exemptionStatus: boolean;
}
export type userExemptStatusChangedEvent = TypedEvent<
  [string, boolean],
  userExemptStatusChangedEventObject
>;

export type userExemptStatusChangedEventFilter =
  TypedEventFilter<userExemptStatusChangedEvent>;

export interface FeeController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FeeControllerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    activateAddressExemption(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    activateAssetIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    activateBRDGHoldingIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    activateIndexedTokenIncentive(
      token: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    activateIndexedUserIncentive(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    activateUserIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    controller(overrides?: CallOverrides): Promise<[string]>;

    deActivateIndexedUserIncentive(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    defaultAssetIncentivePercentage(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    defaultUserIncentivePercentage(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    exemptAddress(
      user: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getBridgeFee(
      sender: PromiseOrValue<string>,
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    indexedUserIncentive(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & {
        incentivePercentage: BigNumber;
        isActive: boolean;
      }
    >;

    isExempted(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    settings(overrides?: CallOverrides): Promise<[string]>;

    tokenHolderIncentive(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        incentivePercentage: BigNumber;
        threshold: BigNumber;
      }
    >;

    updatIndexedTokenIncentivePercentage(
      asset: PromiseOrValue<string>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateBRDGHoldingIncentiveThreshold(
      tokenHoldingLevel: PromiseOrValue<BytesLike>,
      threshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateDefaultAssetIncentivePercentage(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateDefaultUserIncentivePercentage(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateTokenHoldingIncentivePercentage(
      tokenHoldingLevel: PromiseOrValue<BytesLike>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateUserExemptionPercentage(
      user: PromiseOrValue<string>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    useAssetIncentive(overrides?: CallOverrides): Promise<[boolean]>;

    useBRDGHoldingIncentive(overrides?: CallOverrides): Promise<[boolean]>;

    useExemption(overrides?: CallOverrides): Promise<[boolean]>;

    useUserIncentive(overrides?: CallOverrides): Promise<[boolean]>;
  };

  activateAddressExemption(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  activateAssetIncentive(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  activateBRDGHoldingIncentive(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  activateIndexedTokenIncentive(
    token: PromiseOrValue<string>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  activateIndexedUserIncentive(
    user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  activateUserIncentive(
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  controller(overrides?: CallOverrides): Promise<string>;

  deActivateIndexedUserIncentive(
    user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  defaultAssetIncentivePercentage(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  defaultUserIncentivePercentage(overrides?: CallOverrides): Promise<BigNumber>;

  exemptAddress(
    user: PromiseOrValue<string>,
    status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getBridgeFee(
    sender: PromiseOrValue<string>,
    asset: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  indexedUserIncentive(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, boolean] & { incentivePercentage: BigNumber; isActive: boolean }
  >;

  isExempted(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  settings(overrides?: CallOverrides): Promise<string>;

  tokenHolderIncentive(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      incentivePercentage: BigNumber;
      threshold: BigNumber;
    }
  >;

  updatIndexedTokenIncentivePercentage(
    asset: PromiseOrValue<string>,
    percentage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateBRDGHoldingIncentiveThreshold(
    tokenHoldingLevel: PromiseOrValue<BytesLike>,
    threshold: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateDefaultAssetIncentivePercentage(
    percentage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateDefaultUserIncentivePercentage(
    percentage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateTokenHoldingIncentivePercentage(
    tokenHoldingLevel: PromiseOrValue<BytesLike>,
    percentage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateUserExemptionPercentage(
    user: PromiseOrValue<string>,
    percentage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  useAssetIncentive(overrides?: CallOverrides): Promise<boolean>;

  useBRDGHoldingIncentive(overrides?: CallOverrides): Promise<boolean>;

  useExemption(overrides?: CallOverrides): Promise<boolean>;

  useUserIncentive(overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    activateAddressExemption(
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    activateAssetIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    activateBRDGHoldingIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    activateIndexedTokenIncentive(
      token: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    activateIndexedUserIncentive(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    activateUserIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    controller(overrides?: CallOverrides): Promise<string>;

    deActivateIndexedUserIncentive(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    defaultAssetIncentivePercentage(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    defaultUserIncentivePercentage(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exemptAddress(
      user: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    getBridgeFee(
      sender: PromiseOrValue<string>,
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    indexedUserIncentive(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & {
        incentivePercentage: BigNumber;
        isActive: boolean;
      }
    >;

    isExempted(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    settings(overrides?: CallOverrides): Promise<string>;

    tokenHolderIncentive(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        incentivePercentage: BigNumber;
        threshold: BigNumber;
      }
    >;

    updatIndexedTokenIncentivePercentage(
      asset: PromiseOrValue<string>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateBRDGHoldingIncentiveThreshold(
      tokenHoldingLevel: PromiseOrValue<BytesLike>,
      threshold: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateDefaultAssetIncentivePercentage(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateDefaultUserIncentivePercentage(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateTokenHoldingIncentivePercentage(
      tokenHoldingLevel: PromiseOrValue<BytesLike>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateUserExemptionPercentage(
      user: PromiseOrValue<string>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    useAssetIncentive(overrides?: CallOverrides): Promise<boolean>;

    useBRDGHoldingIncentive(overrides?: CallOverrides): Promise<boolean>;

    useExemption(overrides?: CallOverrides): Promise<boolean>;

    useUserIncentive(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    "AddressExemptionStatusChanged(bool)"(
      status?: null
    ): AddressExemptionStatusChangedEventFilter;
    AddressExemptionStatusChanged(
      status?: null
    ): AddressExemptionStatusChangedEventFilter;

    "AssetIncentiveStatusChanged(bool)"(
      status?: null
    ): AssetIncentiveStatusChangedEventFilter;
    AssetIncentiveStatusChanged(
      status?: null
    ): AssetIncentiveStatusChangedEventFilter;

    "AssetIncentiveUpdated(address,uint256,uint256)"(
      asset?: PromiseOrValue<string> | null,
      oldIncentive?: null,
      newIncentive?: null
    ): AssetIncentiveUpdatedEventFilter;
    AssetIncentiveUpdated(
      asset?: PromiseOrValue<string> | null,
      oldIncentive?: null,
      newIncentive?: null
    ): AssetIncentiveUpdatedEventFilter;

    "BrgHoldingIncentiveStatusChanged(bool)"(
      status?: null
    ): BrgHoldingIncentiveStatusChangedEventFilter;
    BrgHoldingIncentiveStatusChanged(
      status?: null
    ): BrgHoldingIncentiveStatusChangedEventFilter;

    "BrgHoldingIncentiveUpdated(uint256,uint256)"(
      prevBrgHoldingIncentive?: null,
      newBrgHoldingIncentive?: null
    ): BrgHoldingIncentiveUpdatedEventFilter;
    BrgHoldingIncentiveUpdated(
      prevBrgHoldingIncentive?: null,
      newBrgHoldingIncentive?: null
    ): BrgHoldingIncentiveUpdatedEventFilter;

    "BrgHoldingThresholdUpdated(uint256,uint256)"(
      prevBrgHoldingThreshold?: null,
      newBrgHoldingThreshold?: null
    ): BrgHoldingThresholdUpdatedEventFilter;
    BrgHoldingThresholdUpdated(
      prevBrgHoldingThreshold?: null,
      newBrgHoldingThreshold?: null
    ): BrgHoldingThresholdUpdatedEventFilter;

    "DefaultAssetIncentivePercentageUpdated(uint256,uint256)"(
      prevVal?: null,
      newVal?: null
    ): DefaultAssetIncentivePercentageUpdatedEventFilter;
    DefaultAssetIncentivePercentageUpdated(
      prevVal?: null,
      newVal?: null
    ): DefaultAssetIncentivePercentageUpdatedEventFilter;

    "DefaultUserIncentivePercentageUpdated(uint256,uint256)"(
      prevVal?: null,
      newVal?: null
    ): DefaultUserIncentivePercentageUpdatedEventFilter;
    DefaultUserIncentivePercentageUpdated(
      prevVal?: null,
      newVal?: null
    ): DefaultUserIncentivePercentageUpdatedEventFilter;

    "UserIncentiveStatusChanged(bool)"(
      status?: null
    ): UserIncentiveStatusChangedEventFilter;
    UserIncentiveStatusChanged(
      status?: null
    ): UserIncentiveStatusChangedEventFilter;

    "UserIncentiveUpdate(address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      previousIncentive?: null,
      currentIncentive?: null
    ): UserIncentiveUpdateEventFilter;
    UserIncentiveUpdate(
      user?: PromiseOrValue<string> | null,
      previousIncentive?: null,
      currentIncentive?: null
    ): UserIncentiveUpdateEventFilter;

    "userExemptStatusChanged(address,bool)"(
      user?: PromiseOrValue<string> | null,
      exemptionStatus?: null
    ): userExemptStatusChangedEventFilter;
    userExemptStatusChanged(
      user?: PromiseOrValue<string> | null,
      exemptionStatus?: null
    ): userExemptStatusChangedEventFilter;
  };

  estimateGas: {
    activateAddressExemption(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    activateAssetIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    activateBRDGHoldingIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    activateIndexedTokenIncentive(
      token: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    activateIndexedUserIncentive(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    activateUserIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    controller(overrides?: CallOverrides): Promise<BigNumber>;

    deActivateIndexedUserIncentive(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    defaultAssetIncentivePercentage(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    defaultUserIncentivePercentage(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exemptAddress(
      user: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getBridgeFee(
      sender: PromiseOrValue<string>,
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    indexedUserIncentive(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isExempted(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    settings(overrides?: CallOverrides): Promise<BigNumber>;

    tokenHolderIncentive(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updatIndexedTokenIncentivePercentage(
      asset: PromiseOrValue<string>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateBRDGHoldingIncentiveThreshold(
      tokenHoldingLevel: PromiseOrValue<BytesLike>,
      threshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateDefaultAssetIncentivePercentage(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateDefaultUserIncentivePercentage(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateTokenHoldingIncentivePercentage(
      tokenHoldingLevel: PromiseOrValue<BytesLike>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateUserExemptionPercentage(
      user: PromiseOrValue<string>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    useAssetIncentive(overrides?: CallOverrides): Promise<BigNumber>;

    useBRDGHoldingIncentive(overrides?: CallOverrides): Promise<BigNumber>;

    useExemption(overrides?: CallOverrides): Promise<BigNumber>;

    useUserIncentive(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    activateAddressExemption(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    activateAssetIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    activateBRDGHoldingIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    activateIndexedTokenIncentive(
      token: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    activateIndexedUserIncentive(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    activateUserIncentive(
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    controller(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deActivateIndexedUserIncentive(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    defaultAssetIncentivePercentage(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    defaultUserIncentivePercentage(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    exemptAddress(
      user: PromiseOrValue<string>,
      status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getBridgeFee(
      sender: PromiseOrValue<string>,
      asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    indexedUserIncentive(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isExempted(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    settings(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenHolderIncentive(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updatIndexedTokenIncentivePercentage(
      asset: PromiseOrValue<string>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateBRDGHoldingIncentiveThreshold(
      tokenHoldingLevel: PromiseOrValue<BytesLike>,
      threshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateDefaultAssetIncentivePercentage(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateDefaultUserIncentivePercentage(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateTokenHoldingIncentivePercentage(
      tokenHoldingLevel: PromiseOrValue<BytesLike>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateUserExemptionPercentage(
      user: PromiseOrValue<string>,
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    useAssetIncentive(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    useBRDGHoldingIncentive(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    useExemption(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    useUserIncentive(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
