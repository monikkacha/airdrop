const { inputToConfig } = require("@ethereum-waffle/compiler");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("Greeter", function () {
  let airDopTokenAddress;
  let airDopToken;
  let amount = toWei('1000000');
  let firstSigner;


  before("init contracts", async function () {
    firstSigner = await ethers.getSigner();
    firstSigner = firstSigner.address;

    const AirDopToken = await ethers.getContractFactory("AirDopToken");
    airDopToken = await AirDopToken.deploy(firstSigner, amount);
    await airDopToken.deployed();
    airDopTokenAddress = airDopToken.address;

  });

  it("Check for token supply", async function () {
    const balance = await airDopToken.totalSupply();
    expect(balance).to.equal(toWei(1000000));
  });
}); 
