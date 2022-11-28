// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/Isettings.sol";
import "./interface/Icontroller.sol";

<<<<<<< HEAD

=======
>>>>>>> 8c9597f560eca6914b50572b80df076187a8dfc9
contract FeeController {
    IController public controller;
    Isettings public settings;

<<<<<<< HEAD
   
    enum HoldingLevels {COMMON ,  BETA , ALPHA }
    mapping (address => bool) public isExempted;
=======
    bytes32 COMMON = "COMMON";
    bytes32 BETA = "BETA";
    bytes32 ALPHA = "ALPHA";
    mapping(address => bool) public isExempted;
>>>>>>> 8c9597f560eca6914b50572b80df076187a8dfc9

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

<<<<<<< HEAD
    mapping(HoldingLevels => tokenHolderIncentiveModel) tokenHolderIncentive;
    mapping(address => indexedTokenIncentiveModel) indexedTokenIncentive;
    mapping(address => indexedUserIncentiveModel) indexedUserIncentive;
    
=======
    mapping(bytes32 => tokenHolderIncentiveModel) public tokenHolderIncentive;
    mapping(address => indexedTokenIncentiveModel) public indexedTokenIncentive;
    mapping(address => indexedUserIncentiveModel) public indexedUserIncentive;

>>>>>>> 8c9597f560eca6914b50572b80df076187a8dfc9
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
        require(controller.owner() == msg.sender, "caller is not the owner");
        _;
    }

    modifier Admin() {
        require(
            controller.owner() == msg.sender || controller.isAdmin(msg.sender),
            "caller is not the admin"
        );
        _;
    }

    constructor(IController _controller, Isettings _settings) {
        controller = _controller;
        settings = _settings;
<<<<<<< HEAD
         tokenHolderIncentive[HoldingLevels.COMMON] = tokenHolderIncentiveModel(3 , 50000 ether);
         tokenHolderIncentive[HoldingLevels.BETA] = tokenHolderIncentiveModel(7 , 2000000 ether);
         tokenHolderIncentive[HoldingLevels.ALPHA] = tokenHolderIncentiveModel(15 , 10000000 ether);
=======
        tokenHolderIncentive[COMMON] = tokenHolderIncentiveModel(
            3,
            50000 ether
        );
        tokenHolderIncentive[BETA] = tokenHolderIncentiveModel(
            7,
            2000000 ether
        );
        tokenHolderIncentive[ALPHA] = tokenHolderIncentiveModel(
            15,
            10000000 ether
        );
>>>>>>> 8c9597f560eca6914b50572b80df076187a8dfc9
    }

    function activateBRDGHoldingIncentive(bool status) public Admin {
        require(useBRDGHoldingIncentive != status, "already set");
        useBRDGHoldingIncentive = status;
        emit BrgHoldingIncentiveStatusChanged(status);
    }

    function activateUserIncentive(bool status) public Admin {
        require(useUserIncentive != status, "already set");
        useUserIncentive = status;
        emit UserIncentiveStatusChanged(status);
    }

    function activateAssetIncentive(bool status) public Admin {
        require(useAssetIncentive != status, "already set");
        useAssetIncentive = status;
        emit AssetIncentiveStatusChanged(status);
    }

    function updateDefaultAssetIncentivePercentage(uint256 percentage)
        external
        Admin
    {
        require(percentage < 50, "invalid %");
        DefaultAssetIncentivePercentageUpdated(
            defaultAssetIncentivePercentage,
            percentage
        );
        defaultAssetIncentivePercentage = percentage;
    }

    function updateDefaultUserIncentivePercentage(uint256 percentage)
        external
        Admin
    {
        require(percentage < 50, "invalid %");
        DefaultUserIncentivePercentageUpdated(
            defaultUserIncentivePercentage,
            percentage
        );
        defaultUserIncentivePercentage = percentage;
    }

    function updateBRDGHoldingIncentiveThreshold(
        HoldingLevels tokenHoldingLevel,
        uint256 threshold
    ) external Admin {
<<<<<<< HEAD
       
        HoldingLevels _tokenHoldingLevel = getTokenHolding(tokenHoldingLevel);
       
        if (_tokenHoldingLevel == HoldingLevels.ALPHA) {
=======
        require(
            tokenHoldingLevel == COMMON ||
                tokenHoldingLevel == BETA ||
                tokenHoldingLevel == ALPHA,
            "invalid holding Incentive"
        );
        bytes32 _tokenHoldingLevel = getTokenHolding(tokenHoldingLevel);

        if (_tokenHoldingLevel == ALPHA) {
>>>>>>> 8c9597f560eca6914b50572b80df076187a8dfc9
            require(
                threshold > tokenHolderIncentive[HoldingLevels.BETA].threshold &&
                    tokenHolderIncentive[HoldingLevels.BETA].threshold >
                    tokenHolderIncentive[HoldingLevels.COMMON].threshold &&
                    tokenHolderIncentive[HoldingLevels.COMMON].threshold > 0
            );
        } else if (_tokenHoldingLevel == HoldingLevels.BETA) {
            require(
                tokenHolderIncentive[HoldingLevels.ALPHA].threshold > threshold &&
                    threshold > tokenHolderIncentive[HoldingLevels.COMMON].threshold &&
                    tokenHolderIncentive[HoldingLevels.COMMON].threshold > 0
            );
        } else if (_tokenHoldingLevel == HoldingLevels.COMMON) {
            require(
                tokenHolderIncentive[HoldingLevels.ALPHA].threshold >
                    tokenHolderIncentive[HoldingLevels.BETA].threshold &&
                    tokenHolderIncentive[HoldingLevels.BETA].threshold > threshold &&
                    threshold > 0
            );
        }
        emit BrgHoldingThresholdUpdated(
            tokenHolderIncentive[_tokenHoldingLevel].threshold,
            threshold
        );
        tokenHolderIncentive[_tokenHoldingLevel].threshold = threshold;
    }

    function exemptAddress(address user, bool status) external onlyOwner {
        require(isExempted[user] != status, "already set");
        emit userExemptStatusChanged(user, status);
        isExempted[user] = status;
    }

    function activateAddressExemption(bool status) public Admin {
        require(useExemption != status, "already set");
        AddressExemptionStatusChanged(status);
        useExemption = status;
    }

    function updateIndexedTokenIncentivePercentage(
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

    function getTokenHolding(HoldingLevels tokenHoldingLevel)
        internal
        pure
        returns (HoldingLevels _tokenHoldingLevel)
    {
        if (tokenHoldingLevel == HoldingLevels.COMMON) {
            return HoldingLevels.COMMON;
        } else if (tokenHoldingLevel == HoldingLevels.BETA) {
            return HoldingLevels.BETA;
        } else if (tokenHoldingLevel == HoldingLevels.ALPHA) {
            return HoldingLevels.ALPHA;
        } else {
            revert();
        }
    }

    function updateTokenHoldingIncentivePercentage(
        HoldingLevels tokenHoldingLevel,
        uint256 percentage
    ) external Admin {
         
        HoldingLevels _tokenHoldingLevel = getTokenHolding(tokenHoldingLevel);
        uint256 previousPercentage = tokenHolderIncentive[_tokenHoldingLevel]
            .incentivePercentage;
        if (_tokenHoldingLevel == HoldingLevels.ALPHA) {
            require(
                percentage > tokenHolderIncentive[HoldingLevels.BETA].incentivePercentage &&
                    tokenHolderIncentive[HoldingLevels.BETA].incentivePercentage >
                    tokenHolderIncentive[HoldingLevels.COMMON].incentivePercentage &&
                    tokenHolderIncentive[HoldingLevels.COMMON].incentivePercentage > 0
            );
        } else if (_tokenHoldingLevel == HoldingLevels.BETA) {
            require(
                tokenHolderIncentive[HoldingLevels.ALPHA].incentivePercentage > percentage &&
                    percentage >
                    tokenHolderIncentive[HoldingLevels.COMMON].incentivePercentage &&
                    tokenHolderIncentive[HoldingLevels.COMMON].incentivePercentage > 0
            );
        } else if (_tokenHoldingLevel == HoldingLevels.COMMON) {
            require(
                tokenHolderIncentive[HoldingLevels.ALPHA].incentivePercentage >
                    tokenHolderIncentive[HoldingLevels.BETA].incentivePercentage &&
                    tokenHolderIncentive[HoldingLevels.BETA].incentivePercentage >
                    percentage &&
                    percentage > 0
            );
        }
        tokenHolderIncentive[tokenHoldingLevel]
            .incentivePercentage = percentage;

        emit BrgHoldingIncentiveUpdated(previousPercentage, percentage);
    }

    function activateIndexedTokenIncentive(address token, bool status)
        external
        Admin
    {
        require(indexedTokenIncentive[token].isActive != status, "already set");
        if (status) indexedTokenIncentive[token].isActive = status;
        else
            indexedTokenIncentive[token] = indexedTokenIncentiveModel(
                defaultAssetIncentivePercentage,
                status
            );
        emit AssetIncentiveStatusChanged(true);
    }

    function activateIndexedUserIncentive(address user) external Admin {
        require(!indexedUserIncentive[user].isActive, "already active");
        indexedUserIncentive[user] = indexedUserIncentiveModel(
            defaultUserIncentivePercentage,
            true
        );

        emit userExemptStatusChanged(user, true);
    }

    function deActivateIndexedUserIncentive(address user) external Admin {
        require(indexedUserIncentive[user].isActive, "already deactivated");
        indexedUserIncentive[user].isActive = false;
        emit userExemptStatusChanged(user, false);
    }

    function determineTokenHolderLevelPercentage(address holder)
        public
        view
        returns (uint256 percentage)
    {
        uint256 holdingAmount = IERC20(settings.brgToken()).balanceOf(holder);

        if (holdingAmount >= tokenHolderIncentive[HoldingLevels.ALPHA].threshold) {
            return tokenHolderIncentive[HoldingLevels.ALPHA].incentivePercentage;
        } else if (
            holdingAmount < tokenHolderIncentive[HoldingLevels.ALPHA].threshold &&
            holdingAmount >= tokenHolderIncentive[HoldingLevels.BETA].threshold
        ) {
             return tokenHolderIncentive[HoldingLevels.BETA].incentivePercentage;
        } else if (
            holdingAmount < tokenHolderIncentive[HoldingLevels.BETA].threshold &&
            holdingAmount >= tokenHolderIncentive[HoldingLevels.COMMON].threshold
        ) {
             return tokenHolderIncentive[HoldingLevels.COMMON].incentivePercentage;
        } else {
            return 0;
        }
    }

    function getBridgeFee(address sender, address asset)
        external
        view
        returns (uint256)
    {
        if (!settings.baseFeeEnable()) return 0;

        uint256 fees = settings.baseFeePercentage();
        uint256 totalIncentive;

        if (useExemption && isExempted[sender]) {
            return 0;
        }
        if (useAssetIncentive) {
            if (indexedTokenIncentive[asset].isActive) {
                totalIncentive += indexedTokenIncentive[asset]
                    .incentivePercentage;
            }
        }

        if (useUserIncentive) {
            if (indexedUserIncentive[sender].isActive) {
                totalIncentive += indexedUserIncentive[sender]
                    .incentivePercentage;
            }
        }

        if (useBRDGHoldingIncentive) {
            uint256 holderPecentage = determineTokenHolderLevelPercentage(
                sender
            );
            totalIncentive += holderPecentage;
        }

        if (totalIncentive >= 100) {
            return 0;
        } else {
            return fees - ((totalIncentive * fees) / 100);
        }
    }
}
