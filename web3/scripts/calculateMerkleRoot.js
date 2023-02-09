/**
 * This script will calculate the merkle root from the whitelist array
 * @format
 */

const hre = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("./whitelist.js");

async function main() {
  // Re-calculate merkle root from the whitelist array.
  const leafNodes = whitelist.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const root = merkleTree.getRoot();

  console.log("Whitelist Merkle root set to:", root);

  const leaf = keccak256("0x391d4ae8f784bDf4Ff93cEe6ef4444f4cBc2B03A");
  const proof = merkleTree.getHexProof(leaf);

  console.log("Proof:", proof);
  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root);
  console.log("Is valid:", isValid);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
