// SPDX-License-Identifier: MIT
// Generated with Spectral Syntax

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoEthBid is Ownable {
    struct RideRequest {
        uint requestId;
        address rider;
        string location;
        string destination;
        uint startingBid;
        bool fulfilled;
        uint acceptedBid;
        address acceptedDriver;
    }

    struct Bid {
        uint bidId;
        address driver;
        uint amount;
    }

    mapping(uint => RideRequest) public rideRequests;
    mapping(uint => Bid[]) public bids;

    IERC20 public token;

    uint public rideRequestCount;

    constructor(address _token, address _owner) Ownable(_owner) {
        token = IERC20(_token);
        rideRequestCount = 0;
    }

    // Function to create a new ride request
    function createRideRequest(
        string memory _location,
        string memory _destination,
        uint _startingBid
    ) public {
        uint requestId = rideRequestCount;
        rideRequests[requestId] = RideRequest(
            requestId,
            msg.sender,
            _location,
            _destination,
            _startingBid,
            false,
            0,
            address(0)
        );

        rideRequestCount++;
    }

    // Function for drivers to place bids on available ride requests
    function placeBid(uint _requestId, uint _bidAmount) public {
        require(
            rideRequests[_requestId].startingBid < _bidAmount,
            "Bid amount must be higher than the starting bid"
        );
        bids[_requestId].push(
            Bid(bids[_requestId].length, msg.sender, _bidAmount)
        );
    }

    // Function for the rider to accept a bid
    function acceptBid(uint _requestId, uint _bidId) public {
        require(
            msg.sender == rideRequests[_requestId].rider,
            "Only the rider can accept a bid"
        );
        require(
            !rideRequests[_requestId].fulfilled,
            "Ride has already been fulfilled"
        );
        Bid storage bid = bids[_requestId][_bidId];
        require(bid.amount > 0, "Invalid bid ID");
        rideRequests[_requestId].acceptedBid = bid.amount;
        rideRequests[_requestId].acceptedDriver = bid.driver;
        rideRequests[_requestId].fulfilled = true;
        // No direct token transfer here
    }

    // Function to mark a ride as completed and transfer the accepted bid amount to the rider
    function completeRide(uint _requestId) public {
        require(
            msg.sender == rideRequests[_requestId].acceptedDriver,
            "Only the accepted driver can mark the ride as completed"
        );
        require(
            rideRequests[_requestId].fulfilled,
            "Ride must be accepted before it can be marked as completed"
        );
        uint amountToTransfer = rideRequests[_requestId].acceptedBid;
        require(amountToTransfer > 0, "No accepted bid to transfer");
        rideRequests[_requestId].fulfilled = true; // Mark the ride as completed
        token.transfer(
            rideRequests[_requestId].rider,
            amountToTransfer
        );
    }

    // Function to retrieve all bids for a specific ride request
    function getBids(uint _requestId) public view returns (Bid[] memory) {
        return bids[_requestId];
    }
}
