// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/Isettings.sol";
import "./interface/Icontroller.sol";



contract FeeController {
    IController public controller;
    Isettings public settings;

    bytes32 COMMON = "COMMON";
    bytes32 BETA = "BETA";
    bytes32 ALPHA = "ALPHA";
    mapping (address => bool) public isExempted;

    struct tokenHolderIncentiveModel {
        uint256 incentivePercentage;
        uint256 threshold;
    }

    struct indexedTokenIncentiveModel {
        uint256 incentivePercentage;
        bool isActive;
    }

    struct indexedUserIncentiveModel {
        uint256 incentivePercentage;
        bool isActive;
    }

    bool public useExemption;
    bool public useBRDGHoldingIncentive;
    bool public useUserIncentive;
    bool public useAssetIncentive;

    uint256 public defaultUserIncentivePercentage = 10;
    uint256 public defaultAssetIncentivePercentage = 10;

    mapping(bytes32 => tokenHolderIncentiveModel) tokenHolderIncentive;
    mapping(address => indexedTokenIncentiveModel) indexedTokenIncentive;
    mapping(address => indexedUserIncentiveModel) indexedUserIncentive;
    
    event BrgHoldingIncentiveStatusChanged(bool status);
    event UserIncentiveStatusChanged(bool status);
    event AssetIncentiveStatusChanged(bool status);
    event AddressExemptionStatusChanged(bool status);
    event AssetIncentiveUpdated(
        address indexed asset,
        uint256 oldIncentive,
        uint256 newIncentive
    );

    event userExemptStatusChanged(address indexed user, bool exemptionStatus);
    event UserIncentiveUpdate(
        address indexed user,
        uint256 previousIncentive,
        uint256 currentIncentive
    );
    
    event BrgHoldingThresholdUpdated(
        uint256 prevBrgHoldingThreshold,
        uint256 newBrgHoldingThreshold
    );

     event DefaultAssetIncentivePercentageUpdated(
        uint256 prevVal,
        uint256 newVal
    );

     event DefaultUserIncentivePercentageUpdated(
        uint256 prevVal,
        uint256 newVal
    );
    event BrgHoldingIncentiveUpdated(
        uint256 prevBrgHoldingIncentive,
        uint256 newBrgHoldingIncentive
    );

    modifier onlyOwner() {
        require(controller.owner() == msg.sender, " caller is not the owner");
        _;
    }

    modifier Admin() {
        require(
            controller.owner() == msg.sender || controller.isAdmin(msg.sender),
            " caller is not the admin"
        );
        _;
    }

    constructor(IController _controller, Isettings _settings) {
        controller = _controller;
        settings = _settings;
    }

    function activateBRDGHoldingIncentive(bool status)
        public
        Admin
    {
        require(
            useBRDGHoldingIncentive != status,
            "already set"
        );
        useBRDGHoldingIncentive = status;
        emit BrgHoldingIncentiveStatusChanged(status);
    }
   function activateUserIncentive(bool status)
        public
        Admin
    {
        require(
            useUserIncentive != status,
            "already set"
        );
        useUserIncentive = status;
        emit UserIncentiveStatusChanged(status);
    }
    function activateAssetIncentive(bool status)
        public
        Admin
    {
        require(
            useAssetIncentive != status,
            "already set"
        );
        useAssetIncentive = status;
        emit AssetIncentiveStatusChanged(status);
    }
  

   function updateDefaultAssetIncentivePercentage(uint256 percentage)  external Admin {
       require(percentage < 50 ,"invalid %");
       DefaultAssetIncentivePercentageUpdated(defaultAssetIncentivePercentage ,percentage);
       defaultAssetIncentivePercentage = percentage;
   }

   function updateDefaultUserIncentivePercentage(uint256 percentage)  external Admin {
       require(percentage < 50 ,"invalid %");
       DefaultUserIncentivePercentageUpdated(defaultUserIncentivePercentage ,percentage);
       defaultUserIncentivePercentage = percentage;
   }
    function updateBRDGHoldingIncentiveThreshold(
        bytes32 tokenHoldingLevel,
        uint256 threshold
    ) external Admin {
        require(
           tokenHoldingLevel == COMMON || tokenHoldingLevel == BETA || tokenHoldingLevel == ALPHA ,
           "invalid holding Incentive"
        );
        bytes32 _tokenHoldingLevel = getTokenHolding(tokenHoldingLevel);
       
        if (_tokenHoldingLevel == ALPHA) {
            require(
                threshold > tokenHolderIncentive[BETA].threshold &&
                    tokenHolderIncentive[BETA].threshold >
                    tokenHolderIncentive[COMMON].threshold &&
                    tokenHolderIncentive[COMMON].threshold > 0
            );
        } else if (_tokenHoldingLevel == BETA) {
            require(
                tokenHolderIncentive[ALPHA].threshold > threshold &&
                    threshold > tokenHolderIncentive[COMMON].threshold &&
                    tokenHolderIncentive[COMMON].threshold > 0
            );
        } else if (_tokenHoldingLevel == COMMON) {
            require(
                tokenHolderIncentive[ALPHA].threshold >
                    tokenHolderIncentive[BETA].threshold &&
                    tokenHolderIncentive[BETA].threshold > threshold &&
                    threshold > 0
            );
        }
        emit BrgHoldingThresholdUpdated(tokenHolderIncentive[_tokenHoldingLevel].threshold , threshold);
        tokenHolderIncentive[_tokenHoldingLevel].threshold = threshold;

        
    }
    function exemptAddress(address user , bool status) external  onlyOwner {
     require(isExempted[user] != status ,"already set");
     emit userExemptStatusChanged(user , status);
     isExempted[user] = status;
     }

    function activateAddressExemption(bool status) public Admin {
        require(useExemption != status , "already set");
        AddressExemptionStatusChanged(status);
        useExemption = status;
    }
    function updatIndexedTokenIncentivePercentage(
        address asset,
        uint256 percentage
    ) public Admin {
        require(
            indexedTokenIncentive[asset].isActive,
            "FeeController: asset exemption not active"
        );
        uint256 previousPercentage = indexedTokenIncentive[asset]
            .incentivePercentage;
        indexedTokenIncentive[asset].incentivePercentage = percentage;

        emit AssetIncentiveUpdated(asset, previousPercentage, percentage);
    }

    function updateUserExemptionPercentage(address user, uint256 percentage)
        public
        Admin
    {
        require(
            indexedUserIncentive[user].isActive,
            "FeeController: user exemption not active"
        );
        uint256 previousPercentage = indexedUserIncentive[user]
            .incentivePercentage;
        indexedUserIncentive[user].incentivePercentage = percentage;

        emit UserIncentiveUpdate(user, previousPercentage, percentage);
    }

    function getTokenHolding(bytes32 tokenHoldingLevel)
        internal
        view
        returns (bytes32 _tokenHoldingLevel)
    {
        if (tokenHoldingLevel == COMMON) {
            return COMMON;
        } else if (tokenHoldingLevel == BETA) {
            return BETA;
        } else if (tokenHoldingLevel == ALPHA) {
            return ALPHA;
        } else {
            revert();
        }
    }

    function updateTokenHoldingIncentivePercentage(
        bytes32 tokenHoldingLevel,
        uint256 percentage
    ) external Admin {
         require(
           tokenHoldingLevel == COMMON || tokenHoldingLevel == BETA || tokenHoldingLevel == ALPHA ,
           "invalid holding Incentive"
        );
        bytes32 _tokenHoldingLevel = getTokenHolding(tokenHoldingLevel);
        uint256 previousPercentage = tokenHolderIncentive[_tokenHoldingLevel]
            .incentivePercentage;
        if (_tokenHoldingLevel == ALPHA) {
            require(
                percentage > tokenHolderIncentive[BETA].incentivePercentage &&
                    tokenHolderIncentive[BETA].incentivePercentage >
                    tokenHolderIncentive[COMMON].incentivePercentage &&
                    tokenHolderIncentive[COMMON].incentivePercentage > 0
            );
        } else if (_tokenHoldingLevel == BETA) {
            require(
                tokenHolderIncentive[ALPHA].incentivePercentage > percentage &&
                    percentage >
                    tokenHolderIncentive[COMMON].incentivePercentage &&
                    tokenHolderIncentive[COMMON].incentivePercentage > 0
            );
        } else if (_tokenHoldingLevel == COMMON) {
            require(
                tokenHolderIncentive[ALPHA].incentivePercentage >
                    tokenHolderIncentive[BETA].incentivePercentage &&
                    tokenHolderIncentive[BETA].incentivePercentage >
                    percentage &&
                    percentage > 0
            );
        }
        tokenHolderIncentive[tokenHoldingLevel]
            .incentivePercentage = percentage;

        emit BrgHoldingIncentiveUpdated(previousPercentage, percentage);
    }

    function activateIndexedTokenIncentive(address token , bool status) external Admin {
        require(!indexedTokenIncentive[token].isActive != status, "already set");
        indexedTokenIncentive[token].isActive = status;

        emit AssetIncentiveStatusChanged(true);
    }

    

    function activateIndexedUserIncentive(address user) external Admin {
        require(!indexedUserIncentive[user].isActive, "already active");
        indexedUserIncentive[user].isActive = true;

        emit userExemptStatusChanged(user, true);
    }

    function deActivateIndexedUserIncentive(address user) external Admin {
        require(indexedUserIncentive[user].isActive, "already deactivated");
        indexedUserIncentive[user].isActive = true;

        emit userExemptStatusChanged(user, false);
    }

    function determineTokenHolderLevelPercentage(address holder)
        internal
        view
        returns (uint256 percentage)
    {
        uint256 holdingAmount = IERC20(settings.brgToken()).balanceOf(holder);

        if (holdingAmount >= tokenHolderIncentive[ALPHA].threshold) {
            return tokenHolderIncentive[ALPHA].incentivePercentage;
        } else if (
            holdingAmount < tokenHolderIncentive[ALPHA].threshold &&
            holdingAmount >= tokenHolderIncentive[BETA].threshold
        ) {
             return tokenHolderIncentive[BETA].incentivePercentage;
        } else if (
            holdingAmount < tokenHolderIncentive[BETA].threshold &&
            holdingAmount >= tokenHolderIncentive[COMMON].threshold
        ) {
             return tokenHolderIncentive[COMMON].incentivePercentage;
        } else {
            return 0;
        }
    }

    function getBridgeFee(address sender, address asset )
        external
        view
        returns (uint256)
    {
        if(!settings.baseFeeEnable()) return 0;

        uint256 fees = settings.baseFeePercentage();
        uint256 totalIncentive;

        if (useExemption && isExempted[sender]) {
         return 0;
      }
        if( useUserIncentive){
            if (indexedTokenIncentive[asset].isActive) {
                totalIncentive += indexedTokenIncentive[asset].incentivePercentage;
            }
        }

        if(useAssetIncentive) {
            if (indexedUserIncentive[sender].isActive) {
                totalIncentive += indexedUserIncentive[sender].incentivePercentage;
            }
        }

        if(useBRDGHoldingIncentive) {
            uint256 holderPecentage = determineTokenHolderLevelPercentage(sender);
            totalIncentive += holderPecentage;
        }

        if (totalIncentive >= 100) {
            return 0;
        } else {
            return fees - ((totalIncentive * fees) / 100);
        }
    }
}