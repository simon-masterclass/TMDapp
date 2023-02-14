// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// @author simon-masterclass (github)

contract MissionFundingTMD {
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

    event CampaignCreated(
        uint256 id,
        string title,
        string description,
        string image,
        string globalGoalTargets,
        uint256 fundingTarget,
        uint256 startline,
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

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;
    address public missionCommander;
    address public TREASURY;
    uint8 public TREASURY_PERCENT = 4;
    uint256 public TREASURY_TOTAL_COLLECTED;
    bytes32 public root;

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
            "Not allowed to create a campaign. Are you sure you're on the list?"
        );
        _;
    }

    constructor(
        address _missionCommander,
        address _treasury,
        bytes32 _merkleroot
    ) {
        missionCommander = _missionCommander;
        TREASURY = _treasury;
        root = _merkleroot;
    }

    function setMerkleRoot(bytes32 merkleroot) public onlyMissionCommander {
        root = merkleroot;
    }

    // bytes32[] calldata _proof
    // isValidMerkleProof(_proof)
    // Create Campaign with Merkle Proof integration

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
            _deadline > block.timestamp,
            "The deadline should be a date in the future, Commander."
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
            block.timestamp,
            _deadline,
            payable(_owner),
            _active
        );
        numberOfCampaigns++;
        return numberOfCampaigns;
    }

    function donateToCampaignDirectly(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        uint256 amount = (msg.value * (100 - TREASURY_PERCENT)) / 100;

        require(campaign.active, "Campaign is not active anymore, C0.");
        require(campaign.deadline > block.timestamp, "Campaign is over, C0.");
        require(amount > 0, "You need to send some Money, C0.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        if (sent) {
            campaign.amountCollected += amount;
            emit CampaignFunded(
                _id,
                amount,
                (100 - TREASURY_PERCENT),
                msg.sender
            );
        } else {
            revert("Failed to send Money.");
        }

        uint256 Treasury_amount = msg.value - amount;
        (bool sent2, ) = payable(TREASURY).call{value: Treasury_amount}("");
        if (sent2) {
            TREASURY_TOTAL_COLLECTED += Treasury_amount;
        } else {
            revert("Failed to send Money to Treasury.");
        }
    }

    function donateToCampaign(uint256 _id, uint8 _percent) internal {
        Campaign storage campaign = campaigns[_id];
        uint256 amount = (msg.value * _percent) / 100;

        require(campaign.active, "Campaign is not active anymore, C0.");
        require(campaign.deadline > block.timestamp, "Campaign is over, C0.");
        require(amount > 0, "You need to send some Money, C0.");

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
        uint256 _id0,
        uint8 _percent0,
        uint256 _id1,
        uint8 _percent1,
        uint256 _id2,
        uint8 _percent2,
        uint256 _id3,
        uint8 _percent3,
        uint256 _id4,
        uint8 _percent4
    ) public payable {
        require(
            _percent0 +
                _percent1 +
                _percent2 +
                _percent3 +
                _percent4 +
                TREASURY_PERCENT ==
                100,
            "Percentages must add up to 100"
        );
        require(msg.value > 0, "You need to send some Money, C0.");

        if (_id0 == _id1 || _id0 == _id2 || _id0 == _id3 || _id0 == _id4) {
            uint8 percent_0;

            if (_id0 == _id1) {
                percent_0 = _percent0 + _percent1;
                donateToCampaign(_id0, percent_0);
                donateToCampaign(_id2, _percent2);
                donateToCampaign(_id3, _percent3);
                donateToCampaign(_id4, _percent4);
            } else if (_id0 == _id2) {
                percent_0 = _percent0 + _percent2;
                donateToCampaign(_id0, percent_0);
                donateToCampaign(_id1, _percent1);
                donateToCampaign(_id3, _percent3);
                donateToCampaign(_id4, _percent4);
            } else if (_id0 == _id3) {
                percent_0 = _percent0 + _percent3;
                donateToCampaign(_id0, percent_0);
                donateToCampaign(_id1, _percent1);
                donateToCampaign(_id2, _percent2);
                donateToCampaign(_id4, _percent4);
            } else if (_id0 == _id4) {
                percent_0 = _percent0 + _percent4;
                donateToCampaign(_id0, percent_0);
                donateToCampaign(_id1, _percent1);
                donateToCampaign(_id2, _percent2);
                donateToCampaign(_id3, _percent3);
            }
        } else {
            donateToCampaign(_id0, _percent0);
            donateToCampaign(_id1, _percent1);
            donateToCampaign(_id2, _percent2);
            donateToCampaign(_id3, _percent3);
            donateToCampaign(_id4, _percent4);
        }

        uint256 Treasury_amount = (msg.value * TREASURY_PERCENT) / 100;
        (bool sent, ) = payable(TREASURY).call{value: Treasury_amount}("");
        if (sent) {
            TREASURY_TOTAL_COLLECTED += Treasury_amount;
        } else {
            revert("Failed to send Money to Treasury.");
        }
    }

    function getDonators(uint256 _id)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaign(uint256 _id) public view returns (Campaign memory) {
        return campaigns[_id];
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
