const { inputToConfig } = require("@ethereum-waffle/compiler");
const { expect } = require("chai");
const { Signer } = require("ethers");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)
const print = (msg) => console.log(msg);

describe("Greeter", function () {
  let airDopToken;
  let swapContract;
  let amount = toWei('1000000');
  let firstSigner;
  let elementAddresses;


  const oneMillion = 1000000;
  const rate = 100;

  before("init contracts", async function () {
    elementAddresses = await ethers.getSigners();
    firstSigner = await ethers.getSigner();
    firstSigner = firstSigner.address;

    const Swap = await ethers.getContractFactory("Swap");
    swapContract = await Swap.deploy(rate);
    await swapContract.deployed();

    airDopTokenAddress = swapContract.airDopToken();
    airDopToken = (await ethers.getContractFactory("AirDopToken")).attach(airDopTokenAddress);

  });

  it("Check for token supply", async function () {
    const balance = await airDopToken.totalSupply();
    expect(balance).to.equal(toWei(oneMillion));
  });

  it("Check for available token", async function () {
    const balance = await airDopToken.balanceOf(swapContract.address);
    expect(balance).to.equal(toWei(oneMillion));
  });

  it("Buy Tokens", async function () {
    await swapContract.connect(elementAddresses[1]).buy({ value: toWei(10) });
    const balance = await airDopToken.balanceOf(elementAddresses[1].address);
    expect(balance).to.equal(toWei(1000));
  });

  it("Sell Tokens", async function () {
    await swapContract.connect(elementAddresses[1]).buy({ value: toWei(10) });
    const balance = await airDopToken.balanceOf(elementAddresses[1].address);
    expect(balance).to.equal(toWei(2000));

    await airDopToken.connect(elementAddresses[1]).approve(swapContract.address, toWei(100));
    await swapContract.connect(elementAddresses[1]).sell(toWei(100));
    const newBalance = await airDopToken.balanceOf(elementAddresses[1].address);
    expect(newBalance).to.equal(toWei(1900));
  });
}); 
