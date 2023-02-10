/** @format */

require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MissionFunding3 TMD tests:", () => {
  let missionFundingContract;
  let accounts,
    missionCommander,
    testOwner_1,
    testOwner_2,
    testOwner_3,
    testOwner_4,
    testOwner_5,
    donator_6,
    donator_7,
    donator_8,
    donator_9,
    donator_10;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    missionCommander = accounts[0];
    testOwner_1 = accounts[1];
    testOwner_2 = accounts[2];
    testOwner_3 = accounts[3];
    testOwner_4 = accounts[4];
    testOwner_5 = accounts[5];
    donator_6 = accounts[6];
    donator_7 = accounts[7];
    donator_8 = accounts[8];
    donator_9 = accounts[9];
    donator_10 = accounts[10];
    TREASURY = accounts[11];

    const MissionFunding = await ethers.getContractFactory("MissionFunding3");
    const missionFunding = await MissionFunding.deploy(
      missionCommander.address,
      TREASURY.address,
      "0x3db289f424d3fdfa8b6282a35ae6b64c3850aceb89ff8bc6897a11c3f24a9381"
    );
    missionFundingContract = await missionFunding.deployed();
  });

  describe("Deployment", () => {
    it("should set the correct missionCommander address", async () => {
      expect(await missionFundingContract.missionCommander()).to.eq(
        missionCommander.address
      );
    });
    it("should set the correct Merkleroot", async () => {
      expect(await missionFundingContract.root()).to.eq(
        "0x3db289f424d3fdfa8b6282a35ae6b64c3850aceb89ff8bc6897a11c3f24a9381"
      );
    });
  });

  describe("Create a Campaign:", () => {
    it("should create a campaign", async () => {
      const title = "Campaign 1";
      const description = "Description for campaign 1";
      const image = "image-url-1";
      const globalGoalTargets = "SDG-0.0.0";
      const fundingTarget = "100000000000000000";
      const deadline = "1677104542";
      const owner = testOwner_1.address;
      const active = true;

      const tx = await missionFundingContract.createCampaign(
        title,
        description,
        image,
        globalGoalTargets,
        fundingTarget,
        deadline,
        owner,
        active
      );

      // console.log("TX:", tx);
      let result = await tx.wait();
      //console.log("TX results:", result.events[0].args);

      expect(result.events[0].args.title).to.eq(title);
      expect(result.events[0].args.title).to.eq(title);
      expect(result.events[0].args.description).to.eq(description);
      expect(result.events[0].args.image).to.eq(image);
      expect(result.events[0].args.globalGoalTargets).to.eq(globalGoalTargets);
      expect(result.events[0].args.fundingTarget).to.eq(fundingTarget);
      expect(result.events[0].args.deadline).to.eq(deadline);
      expect(result.events[0].args.owner).to.eq(owner);
      expect(result.events[0].args.active).to.eq(active);
    });

    it("should fail to create a campaign with a past deadline", async () => {
      const title = "Campaign 2";
      const description = "Description for campaign 2";
      const image = "image-url-2";
      const globalGoalTargets = "Targets for campaign 2";
      const fundingTarget = "100000000000000000";
      const deadline = "1579052800";
      const owner = testOwner_1.address;
      const active = true;

      await expect(
        missionFundingContract.createCampaign(
          title,
          description,
          image,
          globalGoalTargets,
          fundingTarget,
          deadline,
          owner,
          active
        )
      ).to.be.revertedWith("The deadline should be a date in the future");
    });
  });

  describe("Donating to Campaigns:", () => {
    beforeEach(async () => {
      const fundingTarget = "100000000000000000";
      const deadline = "1677104542";
      const active = true;

      await missionFundingContract.createCampaign(
        "Campaign 0",
        "Description for campaign 0",
        "image-url-0",
        "SDG-0.0.0",
        fundingTarget,
        deadline,
        testOwner_5.address,
        active
      );

      await missionFundingContract.createCampaign(
        "Campaign 1",
        "Description for campaign 1",
        "image-url-1",
        "SDG-1.1.1",
        fundingTarget,
        deadline,
        testOwner_1.address,
        active
      );

      await missionFundingContract.createCampaign(
        "Campaign 2",
        "Description for campaign 2",
        "image-url-2",
        "SDG-2.2.2",
        fundingTarget,
        deadline,
        testOwner_2.address,
        active
      );

      await missionFundingContract.createCampaign(
        "Campaign 3",
        "Description for campaign 3",
        "image-url-3",
        "SDG-3.3.3",
        fundingTarget,
        deadline,
        testOwner_3.address,
        active
      );

      await missionFundingContract.createCampaign(
        "Campaign 4",
        "Description for campaign 4",
        "image-url-4",
        "SDG-4.4.4",
        fundingTarget,
        deadline,
        testOwner_4.address,
        active
      );
    });

    it("should have created 5 campaign", async () => {
      const numberOfCampaigns =
        await missionFundingContract.numberOfCampaigns();
      expect(numberOfCampaigns).to.eq(5);
    });

    it("should accept donations to a campaign correctly", async () => {
      // Donate to 5 campaigns:
      // 20% of 100 wei to campaign[0]
      // 19% of 100 wei to campaign[1]
      // 19% of 100 wei to campaign[2]
      // 19% of 100 wei to campaign[3]
      // 19% of 100 wei to campaign[4]
      const tx = await missionFundingContract.TMDonationSTG(
        0,
        20,
        1,
        19,
        2,
        19,
        3,
        19,
        4,
        19,
        { from: missionCommander.address, value: 100 }
      );

      // First Donation to Campaign 0
      let campaign0 = await missionFundingContract.getCampaign(0);
      expect(campaign0.donations[0]).to.eq(20);
      // Check mission commander address is in donators array
      expect(campaign0.donators[0]).to.eq(missionCommander.address);
      // Second Donation to Campaign 1
      let campaign1 = await missionFundingContract.getCampaign(1);
      expect(campaign1.donations[0]).to.eq(19);
      // Third Donation to Campaign 2
      let campaign2 = await missionFundingContract.getCampaign(2);
      expect(campaign2.donations[0]).to.eq(19);
      // Fourth Donation to Campaign 3
      let campaign3 = await missionFundingContract.getCampaign(3);
      expect(campaign3.donations[0]).to.eq(19);
      // Fifth Donation to Campaign 4
      let campaign4 = await missionFundingContract.getCampaign(4);
      expect(campaign4.donations[0]).to.eq(19);
      // Treasury balance should be 4 wei
      let treasuryBalance =
        await missionFundingContract.TREASURY_TOTAL_COLLECTED();
      expect(treasuryBalance).to.eq(4);
    });

    it("should accept duplicate campaign donations correctly", async () => {
      // Donate to 4 campaigns (1 duplicate):
      // 20% of 100 wei to campaign[0]
      // 19% of 100 wei to campaign[1]
      // 19% of 100 wei to campaign[2]
      // 19% of 100 wei to campaign[0]
      // 19% of 100 wei to campaign[4]
      const tx = await missionFundingContract.TMDonationSTG(
        0,
        20,
        1,
        19,
        2,
        19,
        0,
        19,
        4,
        19,
        { from: missionCommander.address, value: 100 }
      );

      // First Donation to Campaign 0
      let campaign0 = await missionFundingContract.getCampaign(0);
      expect(campaign0.donations[0]).to.eq(39);
      // Check mission commander address is in donators array
      expect(campaign0.donators[0]).to.eq(missionCommander.address);
      // Second Donation to Campaign 1
      let campaign1 = await missionFundingContract.getCampaign(1);
      expect(campaign1.donations[0]).to.eq(19);
      // Third Donation to Campaign 2
      let campaign2 = await missionFundingContract.getCampaign(2);
      expect(campaign2.donations[0]).to.eq(19);
      // Fourth Donation to Campaign 3
      let campaign3 = await missionFundingContract.getCampaign(3);
      expect(campaign3.donations[0]).to.be.undefined;
      // Fifth Donation to Campaign 4
      let campaign4 = await missionFundingContract.getCampaign(4);
      expect(campaign4.donations[0]).to.eq(19);
      // Treasury balance should be 4 wei
      let treasuryBalance =
        await missionFundingContract.TREASURY_TOTAL_COLLECTED();
      expect(treasuryBalance).to.eq(4);
    });

    it("should be able to donate to a campaign directly", async () => {
      // console.log("Ve made it to the test");
      await missionFundingContract.donateToCampaignDirectly(0, {
        from: missionCommander.address,
        value: 100,
      });
      let campaign0 = await missionFundingContract.getCampaign(0);
      expect(campaign0.donations[0]).to.eq(96);
      // Treasury balance should be 4 wei
      let treasuryBalance =
        await missionFundingContract.TREASURY_TOTAL_COLLECTED();
      expect(treasuryBalance).to.eq(4);
    });
    // it("should...", async () => {
    //   // console.log("Ve made it to the test");
    //   expect(await missionFundingContract.root()).to.eq(
    //     "0x3db289f424d3fdfa8b6282a35ae6b64c3850aceb89ff8bc6897a11c3f24a9381"
    //   );
    // });
  });
});
