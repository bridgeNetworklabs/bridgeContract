// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interface/Isettings.sol";
import "./interface/IfeeController.sol";
import "./interface/Ibridge.sol";



contract BridgeSocket is Context , ReentrancyGuard , Ownable{
   using SafeERC20 for IERC20;
   Isettings public settings;
   IfeeController public feeController;
   Ibridge public bridge;
   address public feeRemitance;
   uint256 public feePercentage;
   bool public paused;
   bool public innitialized;
   uint256 constant public maxFeePercentage = 10;
    
    modifier notPaused() {
        require(!paused, "Socket paused");
        _;
    }
    
    event feeUpdated(uint256 prevFee , uint256 currentFee);
    event feeRemitanceUpdated(address prevFeeRemitance , address currentFeeRemitance);
    event socketUpdated(
        address currentFeeController,
        address currentSettings,
        address currentBridge
    );
    
    event SendTransaction(
       bytes32 transactionID, 
       uint256 chainID,
       address indexed assetAddress,
       uint256 sendAmount,
       address indexed receiver,
       address indexed  sender
    );

    constructor ( Isettings _settings, IfeeController _feeController , Ibridge _bridge , address _feeRemittance) {
       require( _feeRemittance != address(0) && address(_feeController) != address(0) && address(_settings) != address(0) && address(_bridge) != address(0) , "invalid address");
     settings = _settings;
     feeController = _feeController;
     bridge = _bridge;
     feeRemitance = _feeRemittance;
    }
    function getNativeAssetCount() public view returns (uint256) {
        return bridge.getAssetCount()[0];
    }
    function getForiegnAssetCount() public view returns (uint256)  {
        return bridge.getAssetCount()[1];
    }
    function getDirectswapAssetCount() public view returns (uint256)  {
        return bridge.getAssetCount()[2];
    }
    function validAsset(address assetAddress) public view returns ( bool ){
        Ibridge.asset memory currentAsset;
        currentAsset = bridge.nativeAssets(assetAddress);
        
        if(currentAsset.isSet ){
            return true;
        }
        currentAsset = bridge.foriegnAssets(assetAddress);

        if(currentAsset.isSet ) {
            return true;
        }
        else return false;
        
    }
    function isNativeAsset(address assetAddress) public view returns ( bool ){
        Ibridge.asset memory currentAsset;
        currentAsset = bridge.nativeAssets(assetAddress);
        
        if(currentAsset.isSet ){
            return true;
        }
        return false;
       
        
    }
    function isForiegnAsset(address assetAddress) public view returns ( bool ){
        Ibridge.asset memory currentAsset;
        currentAsset = bridge.foriegnAssets(assetAddress);

        if(currentAsset.isSet ) {
            return true;
        }
        else return false;
       
        
    }
     
    function getAssetLimits(address assetAddress) public view returns (uint256 , uint256 ){
        Ibridge.asset memory currentAsset;
        currentAsset = bridge.nativeAssets(assetAddress);
        
        if(currentAsset.isSet ){
            return (currentAsset.minAmount , currentAsset.maxAmount);
        }
        currentAsset = bridge.foriegnAssets(assetAddress);

        if(currentAsset.isSet ) {
            return (currentAsset.minAmount , currentAsset.maxAmount);
        }
        else return ( 0 , 0);
        
    }

    function getSupportedChainIDs()  public view returns (uint256[] memory){
       return settings.getNetworkSupportedChains(); 
    }
    function isSupportedChain(uint256 chainID) public view returns (bool){
        return settings.isNetworkSupportedChain(chainID);
    }
    function getAsset(address assetAddress) public view returns (Ibridge.asset memory){
        Ibridge.asset memory currentAsset;
        currentAsset = bridge.nativeAssets(assetAddress);
        
        if(currentAsset.isSet ){
            return currentAsset;
        }
        currentAsset = bridge.foriegnAssets(assetAddress);

        if(currentAsset.isSet ) {
            return currentAsset;
        }
        else {
          return   bridge.nativeAssets(assetAddress);
        }
    }

   function getTransactionGas(address sender, address asset , uint256 chainTo) public view returns(uint256){
       return feeController.getBridgeFee( sender,  asset, chainTo );
   }

   function getTransactionFee(uint256 amount) public view returns (uint256){
       if(feePercentage == 0 || amount == 0) {
           return 0;
       } else {
           return feePercentage * amount / 10000;
       }
   }
   
   function bridgeAsset(address assetAddress, uint256 chainID , uint256 amount , address reciever)  public payable  notPaused{
       require(validAsset(assetAddress) , "Invalid Asset");
       (bool success , uint256 _amount , uint gas) = preccessTransaction(assetAddress , chainID, msg.sender, amount);
       require(success && _amount > 0 , "Insuficient funds");
       _amount  =  processFees(_amount ,assetAddress);
       bytes32 transactionID;
       if(isNativeAsset(assetAddress)){
           if(assetAddress == address(0)){
               transactionID = bridge.send{ value : gas + _amount}(chainID , assetAddress, _amount, reciever);
           }else{
               IERC20(assetAddress).safeApprove(address(bridge) , _amount);
              transactionID =  bridge.send{ value : gas}(chainID , assetAddress, _amount, reciever);  
           }
       }
       else {
           IERC20(assetAddress).safeApprove(address(bridge) , _amount);
         transactionID =   bridge.burn{ value : gas}(chainID , assetAddress, _amount, reciever);  
       }

    emit SendTransaction(
            transactionID,
            chainID,
            assetAddress,
            _amount,
            reciever,
            msg.sender
        );
       
        
   }

    function processFees(uint256 amount , address assetAddress) private returns (uint256){
        uint256 baseFeePercentage = settings.baseFeePercentage();
        uint256 baseFee = amount * baseFeePercentage / 10000;
        uint256 socketFee =  (amount - baseFee) * feePercentage  / 10000;
        payoutUser(payable(feeRemitance), assetAddress, socketFee);
        return (amount - socketFee);
    }
   function preccessTransaction (address assetAddress ,uint256 chainID, address sender , uint256 amount ) internal returns (bool , uint256 , uint256){
        uint256 gas = feeController.getBridgeFee(sender, assetAddress, chainID);
        if (assetAddress == address(0)) {
            if(msg.value >= amount + gas &&  msg.value > 0){
                uint256 value = msg.value - gas;
                
                return (true  , value ,gas);
            } else {
                return (false , 0 , 0);
            }
            
        } else {
            IERC20 token = IERC20(assetAddress);
            if (token.allowance(_msgSender(), address(this)) >= amount && (msg.value >=  gas)) {
                uint256 balanceBefore = token.balanceOf(address(this));
                token.safeTransferFrom(_msgSender() , address(this) , amount);
                uint256 balanceAfter = token.balanceOf(address(this));
               return (true , balanceAfter - balanceBefore  , gas);
            } else {
                return (false , 0 , gas);
            }
        }
       
   }
   function payoutUser(address payable recipient , address _paymentMethod , uint256 amount) private {
       require(recipient != address(0) , "invalid recipient");
        if (_paymentMethod == address(0)) {
          recipient.transfer(amount);
        } else {
             IERC20 currentPaymentMethod = IERC20(_paymentMethod);
            currentPaymentMethod.safeTransfer(recipient , amount);
        }
    }
 function updateFee(uint256 fee) public onlyOwner notPaused{
     require(fee <= maxFeePercentage , "Value above max value");
     feeUpdated(feePercentage , fee);
     feePercentage = fee;
     
 }
function updateFeeRemitance(address _feeRemitance) public onlyOwner notPaused{
     require(feeRemitance != _feeRemitance , "already set");
     require(_feeRemitance != address(0) , "invalid Address");
     feeRemitanceUpdated(_feeRemitance , feeRemitance);
     feeRemitance = _feeRemitance;
     
 }
 function pauseSocket()  public onlyOwner {
     require(address(feeController) != address(0) || address(settings) != address(0) || address(bridge) != address(0) , "socket not set");
     paused = !paused;
 }
 function updateSocket(IfeeController _feecontroller , Isettings _settings , Ibridge _bridge) public onlyOwner {
     require(address(_feecontroller) != address(0) && address(_settings) != address(0) && address(_bridge) != address(0) , "invalid address");
     settings = _settings;
     feeController = _feecontroller;
     bridge = _bridge;
     paused =  false;
     socketUpdated(address(_feecontroller) ,address(_settings) ,address(_bridge));
 }
}