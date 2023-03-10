/**
 * This script will calculate the constructor arguments for MissionFunding.sol and deploy it.
 *  After deploying, you can access the contract on etherscan.io with the deployed contract address.
 *
 * @format
 */

const hre = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("./whitelist.js");

const MissionCommanderAddr = "0x9247a564968B69A11BceECbe5A2daDCEB43646FC"; // Bootcamp 0 - Goerli or Mumbai?

// const proxyRegistryAddressGoerli = "0xAB43bA48c9edF4C2C4bB01237348D1D7B28ef168"; // correct?
// const proxyRegistryAddressMumbai = "0xff7Ca10aF37178BdD056628eF42fD7F799fAc77c"; // For NFTs on OpenSea
// const proxyRegistryAddressMainnet = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";

async function main() {
  // Calculate merkle root from the whitelist array
  const leafNodes = whitelist.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const root = merkleTree.getRoot();

  // Deploy the contract
  const MissionFunding = await hre.ethers.getContractFactory("MissionFunding");
  const missionFunding = await MissionFunding.deploy(
    MissionCommanderAddr,
    root
  );

  await missionFunding.deployed();

  console.log(
    "MissionFunding contract deployed to Goerli at:",
    missionFunding.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
