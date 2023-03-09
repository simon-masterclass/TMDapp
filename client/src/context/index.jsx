/** @format */

import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";
import { MerkleTree } from "merkletreejs";
// import { whitelist } from "../whitelist.js";

const StateContext = createContext();

// const { MerkleTree } = require("merkletreejs");
import keccak256 from "keccak256";
import { whitelist } from "../utils/whitelist.js";

const leafNodes = whitelist.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x95c7Ba15758AeBF3A41CE9999F19E9914398e414" //0xf59A1f8251864e1c5a6bD64020e3569be27e6AA9
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    const leaf = keccak256(address);
    const proof = merkleTree.getHexProof(leaf);
    const root = merkleTree.getHexRoot();

    // Verify Merkle Proof
    const isValid = merkleTree.verify(proof, leaf, root);

    if (!isValid) {
      alert(
        "Invalid Merkle Proof - this wallet address is not allowed to create a campaign. Are you sure you're on the list?"
      ); // display error message popup
      return;
    }

    try {
      const data = await createCampaign([
        form.title, // title
        form.description, // description
        form.image, // image
        form.globalgoaltargets, // globalgoaltargets
        form.fundingtarget,
        new Date(form.deadline).getTime(), // deadline,
        address, // owner
        true, // isActive
        proof, // proof
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getAllCampaigns");

    console.log(campaigns);

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      globalgoaltargets: campaign.globalGoalTargets,
      fundingTarget: ethers.utils.formatEther(
        campaign.fundingTarget.toString()
      ),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaignDirectly", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getTreasuryBalance = async () => {
    const data = await contract.call("TREASURY_TOTAL_COLLECTED");
    // const { data } = useContractRead(contract, "getAllCampaigns");
    let balance = ethers.utils.formatEther(data.toString());
    console.log(balance);

    return balance;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        getTreasuryBalance,
      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
