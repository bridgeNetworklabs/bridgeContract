## BridgeSocket Documentation

The Bridge socket contract is a stateless contract that does not hold token balances. They interact with one or more bridge network core contract but is not part of the core contract. It helps with easy interaction with the bridge network core contract.

#### Functions
`function getNativeAssetCount() public view returns (uint256)`
returns the number of native assets deployed on the bridge network

`function getForiegnAssetCount() public view returns (uint256)`
returns the number of foreign assets on the bridge network

`function getDirectswapAssetCount() public view returns (uint256)`
returns the number of assets that can be directly swapped on the bridge network

` function validAsset(address assetAddress) public view returns ( bool )`
returns `true` if the assets can be bridged on the bridge network

`function isNativeAsset(address assetAddress) public view returns ( bool )`
returns `true` if the asset is a native asset

`function isForiegnAsset(address assetAddress) public view returns ( bool )`
returns `true ` if the asset is a foreign asset

`function getAssetLimits(address assetAddress) public view returns (uint256 , uint256 )`
returns the `minimum` and `Maximum` amount of the asset that can be bridged.

`function getSupportedChainIDs()  public view returns (uint256[] memory)`
returns the chainId of the chain supported on the bridge network

`function isSupportedChain(uint256 chainID) public  returns (bool)`
returns `true` if the chainId is supported on the bridge network

`function getAsset(address assetAddress) public view returns (Ibridge.asset memory)`
returns the asset details

` function getTransactionGas(address sender, address asset , uint256 chainTo) public view returns(uint256)`
returns the `amount` that will be charged for bridging an asset. This will be in the native coin of the chain where the transaction is been executed. For example, if the transaction is been executed on the Ethereum blockchain it will be in `ether`

`function getTransactionFee(uint256 amount) public view returns (uint256)`
returns the  `amount` that will be deducted for using the bridge socket

`function bridgeAsset(address assetAddress, uint256 chainID , uint256 amount , address receiver)  public payable ` 
This is the function used for bridging the asset
`assetAddress` : address of the asset being a bridge
`chainID`: the chainID to be bridged to
`receiver`: the address to receive the asset bridged.

