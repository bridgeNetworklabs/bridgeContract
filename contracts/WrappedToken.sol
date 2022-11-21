// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.2;
import "./interface/IERC20deployer.sol";

contract WrappedToken is ERC20, Ownable {
    constructor(string memory _name, string memory _symbol, uint8 _decimals)
        ERC20(_name, _symbol, _decimals)
    {}

    function burn(uint256 amount) public onlyOwner {
        _burn(_msgSender(), amount);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }
}
