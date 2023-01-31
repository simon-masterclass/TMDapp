// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MissionFunding {
    struct Campaign {
        string title;
        string description;
        string image;
        string globalGoalTargets;
        uint256 fundingTarget;
        uint256 deadline;
        uint256 amountCollected;
        uint256[] donations;
        address[] donators;
        address payable owner;
        bool active;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(
        uint256 id,
        string title,
        string description,
        string image,
        string globalGoalTargets,
        uint256 fundingTarget,
        uint256 deadline,
        address payable owner,
        bool active
    );

    event CampaignFunded(uint256 id, uint256 amount, address donator);

    constructor() {}

    function createCampaign(
        string memory _title,
        string memory _description,
        string memory _image,
        string memory _globalGoalTargets,
        uint256 _fundingTarget,
        uint256 _deadline,
        bool _active
    ) public returns (uint256) {
        require(
            _deadline < block.timestamp,
            "The deadline should be a date in the future"
        );

        numberOfCampaigns++;

        campaigns[numberOfCampaigns] = Campaign(
            _title,
            _description,
            _image,
            _globalGoalTargets,
            _fundingTarget,
            _deadline,
            0,
            new uint256[](0),
            new address[](0),
            payable(msg.sender),
            _active
        );
        emit CampaignCreated(
            numberOfCampaigns,
            _title,
            _description,
            _image,
            _globalGoalTargets,
            _fundingTarget,
            _deadline,
            payable(msg.sender),
            _active
        );
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        require(campaign.active, "Campaign is not active anymore.");
        require(campaign.deadline > block.timestamp, "Campaign is over.");
        require(msg.value > 0, "You need to send some Money.");

        (bool sent, ) = payable(campaign.owner).call{value: msg.value}("");
        if (sent) {
            campaign.donators[_id] = msg.sender;
            campaign.donations[_id] = msg.value;
            campaign.amountCollected += msg.value;
            emit CampaignFunded(_id, msg.value, msg.sender);
        } else {
            revert("Failed to send Money.");
        }
    }

    function getDonators(uint256 _id) public view returns (address[] memory) {
        uint256 id = 1;
        Campaign storage campaign = campaigns[id];
        for (uint256 j = 0; j < campaign.donators.length; j++) {
            address donator = campaign.donators[j];
            uint256 amount = campaign.donations[j];
        }
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory _campaigns = new Campaign[](numberOfCampaigns);
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            _campaigns[i] = campaigns[i + 1];
        }
        return _campaigns;
    }
}
