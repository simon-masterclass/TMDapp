/**
 * This script will calculate the constructor arguments for the `verify` function and call it.
 *  You can use this script to verify the contract on etherscan.io.
 *  Be sure to run this script immediately after deploying the contract otherwise the merkle root may change later making the contract more difficult to verify.
 *
 * @format
 */

require("@nomiclabs/hardhat-etherscan");
const hre = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("./whitelist.js");

const TMD_CONTRACT_ADDRESS = "0x95c7Ba15758AeBF3A41CE9999F19E9914398e414"; // Latest contract address - update as needed

const MissionCommanderAddr = "0x9247a564968B69A11BceECbe5A2daDCEB43646FC"; // Bootcamp 0 - Goerli or Mumbai?

// //const proxyRegistryAddressRinkeby = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
// const proxyRegistryAddressGoerli = "0x9247a564968B69A11BceECbe5A2daDCEB43646FC";
// const proxyRegistryAddressMumbai = "0xff7Ca10aF37178BdD056628eF42fD7F799fAc77c"; // For NFTs on OpenSea
// const proxyRegistryAddressMainnet = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";

async function main() {
  // Calculate merkle root from the whitelist array
  const leafNodes = whitelist.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const root = merkleTree.getRoot();

  await hre.run("verify:verify", {
    address: MD_CONTRACT_ADDRESS, // Deployed contract address - OLD-rinkeby: 0x0312e42e4b55823a3C41769DC0B07F382dECc247
    constructorArguments: [MissionCommanderAddr, root], // Constructor arguments
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
