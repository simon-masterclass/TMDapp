/**
 *  This array contains the addresses of the whitelisted users.
 *  Make sure to add your white-listed users to this array. Otherwise,
 *  they will not be able to interact with the contract and mint on pre-sale process. For the public sale,
 *  the whitelist is not required.
 *
 *  ** IMPORTANT: **
 *  Since we are passing the whitelist root (merkleroot) to the contract constructor when deploying,
 *  if you add a new user address to the whitelist or remove an existing user address from the whitelist,
 *  you must change the merkleroot in the contract. For this reason, I created a new script to update the merkleroot
 *  in the contract. You can find it in `scripts/setMerkleRoot.js`.
 */

module.exports = [
  '0x9247a564968B69A11BceECbe5A2daDCEB43646FC', //Bootcamp 0
  '0x391d4ae8f784bDf4Ff93cEe6ef4444f4cBc2B03A', //Bootcamp 1
  '0x9170b78B33A0dC78d1f62eeD46E1B224290D8156', //Bootcamp Tester
  '0x7145F2DD87cf598932442deBE49c41278d88C970' //Bootcamp 2.0 Teser
]
