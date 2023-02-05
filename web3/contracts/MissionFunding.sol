// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// @author simon-masterclass (github)

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
    address public missionCommander;
    bytes32 public root;
    uint256 public TREASURY;

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

    event CampaignFunded(
        uint256 id,
        uint256 amount,
        uint8 percent,
        address donator
    );

    modifier onlyMissionCommander() {
        require(
            msg.sender == missionCommander,
            "You are not the mission commander"
        );
        _;
    }

    modifier isValidMerkleProof(bytes32[] calldata _proof) {
        require(
            MerkleProof.verify(
                _proof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            ) == true,
            "Not allowed to create a campaign - not a valid merkle proof. Are you sure you are on the list?"
        );
        _;
    }

    constructor(address _missionCommander, bytes32 _merkleroot) {
        missionCommander = _missionCommander;
        root = _merkleroot;
    }

    function setMerkleRoot(bytes32 merkleroot) public onlyMissionCommander {
        root = merkleroot;
    }

    function createCampaign(
        string memory _title,
        string memory _description,
        string memory _image,
        string memory _globalGoalTargets,
        uint256 _fundingTarget,
        uint256 _deadline,
        address _owner,
        bool _active,
        bytes32[] calldata _proof
    ) public isValidMerkleProof(_proof) returns (uint256) {
        require(
            _deadline < block.timestamp,
            "The deadline should be a date in the future"
        );

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
            payable(_owner),
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
            payable(_owner),
            _active
        );
        numberOfCampaigns++;
        return numberOfCampaigns;
    }

    function donateToCampaign(uint256 _id, uint8 _percent) public payable {
        Campaign storage campaign = campaigns[_id];
        uint256 amount = (msg.value * _percent) / 100;

        require(campaign.active, "Campaign is not active anymore.");
        require(campaign.deadline > block.timestamp, "Campaign is over.");
        require(amount > 0, "You need to send some Money.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        if (sent) {
            campaign.amountCollected += amount;
            emit CampaignFunded(_id, amount, _percent, msg.sender);
        } else {
            revert("Failed to send Money.");
        }
    }

    function TMDonationSTG(
        uint256 _id1,
        uint8 _percent1,
        uint256 _id2,
        uint8 _percent2,
        uint256 _id3,
        uint8 _percent3,
        uint256 _id4,
        uint8 _percent4,
        uint256 _id5,
        uint8 _percent5
    ) public payable {
        uint8 TREASURY_PERCENT = 4;

        require(
            _percent1 +
                _percent2 +
                _percent3 +
                _percent4 +
                _percent5 +
                TREASURY_PERCENT ==
                100,
            "Percentages must add up to 100"
        );
        require(msg.value > 0, "You need to send some Money.");

        donateToCampaign(_id1, _percent1);
        donateToCampaign(_id2, _percent2);
        donateToCampaign(_id3, _percent3);
        donateToCampaign(_id4, _percent4);
        donateToCampaign(_id5, _percent5);
    }

    function getDonators(uint256 _id)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
