//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AirDopToken is ERC20 {
    constructor(uint256 amount) ERC20("AirDopToken", "ADT") {
        _mint(msg.sender, amount);
    }
}
