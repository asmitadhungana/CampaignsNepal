pragma solidity ^0.4.17;


contract CampaignStore {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender); //creates a new Campaign to the ntk, deploys it and returns the Campaign's address
        deployedCampaigns.push(newCampaign); //push the newCampaign ('s address) to the arr
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}


contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) hasApproved;
    }

    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public contributors;
    uint256 public contributorsCount;

    modifier managerOnly {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint256 minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        //add the contributor to the contributors mapping
        contributors[msg.sender] = true;
        contributorsCount++;
    }

    function createRequest(string description, uint256 value, address recipient)
        public
        managerOnly
    {
        //s/he must be a contributor
        require(contributors[msg.sender]);
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
            //we don't have to initialize a reference type(mapping type) in a struct
        });

        requests.push(newRequest);
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];
        require(contributors[msg.sender]); //the fxn caller must be a contributor
        require(!request.hasApproved[msg.sender]); //the fxn caller mustn't have voted for approval already

        request.hasApproved[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public managerOnly {
        Request storage request = requests[index];

        require(request.approvalCount > (contributorsCount / 2)); //at least 50% of contributers must've approved the request

        require(!request.complete); //the request mustn't have completed already

        request.recipient.transfer(request.value); //transfer the funds to the add. of recipient of the request struct

        request.complete = true; //set the complete property to true
    }
}
