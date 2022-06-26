//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./AirDopToken.sol";
import "hardhat/console.sol";

contract Swap {
    uint32 public RATE;
    uint256 public totalSupply;
    AirDopToken public airDopToken;

    event TokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event TokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(uint32 _rate) {
        RATE = _rate;
        totalSupply = 1000000 ether;
        airDopToken = new AirDopToken(totalSupply);
    }

    function buy() public payable {
        uint256 amount = msg.value * RATE;
        require(
            airDopToken.balanceOf(address(this)) >= amount,
            "Contract does not have enough tokens to satisfy the order"
        );
        if (airDopToken.transfer(msg.sender, amount)) {
            emit TokensPurchased(
                msg.sender,
                address(airDopToken),
                amount,
                RATE
            );
        }
    }

    function sell(uint256 amount) public {
        require(airDopToken.balanceOf(msg.sender) > amount);
        uint256 etherAmount = amount / RATE;
        require(address(this).balance >= etherAmount);
        airDopToken.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(etherAmount);
        emit TokensSold(msg.sender, address(airDopToken), amount, RATE);
    }
}
