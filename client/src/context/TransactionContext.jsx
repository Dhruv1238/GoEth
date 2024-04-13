import { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';
import abi from '../utils/GoEthEscrow.json';

// Create the TransactionContext
export const TransactionContext = createContext();

// Create the TransactionContextProvider component
export const TransactionContextProvider = ({ children }) => {

    // State to store the current account
    const [currentAccount, setCurrentAccount] = useState("");
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [requestedRides, setRequestedRides] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bids, setBids] = useState([]);

    const tokenABI = abi.abi;

    const tokenAddress = "0x2576980B638b257d5f3Bf41ed22c28079f10ABCb";

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Get MetaMask!");
            return;
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);

        // Create the provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Set the provider and signer in the state
        setProvider(provider);
        setSigner(signer);
    };

    useEffect(() => {
        // Connect to MetaMask provider
        connectWallet();
    }, []);

    if (window.ethereum && currentAccount.length === 0) {
        connectWallet();
    }

    // Function to sign the transaction
    const requestRide = async (location, destination, startingBidInRupees, amountToApproveInRupees) => {
        setIsLoading(true);
        try {
            // Fetch the current exchange rate from a cryptocurrency exchange API
            const exchangeRate = 268873.65

            // Convert rupees to ether
            const startingBidEther = startingBidInRupees / exchangeRate;
            const amountToApproveEther = amountToApproveInRupees / exchangeRate;

            // Convert ether to wei
            const startingBidWei = ethers.utils.parseEther(startingBidEther.toString());
            const amountToApproveWei = ethers.utils.parseEther(amountToApproveEther.toString());

            // Create the contract instance
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Send the transaction
            const transactionResponse = await contract.createRideRequest(location, destination, startingBidWei, amountToApproveWei);

            // Wait for the transaction to be mined
            const transactionReceipt = await transactionResponse.wait();

            console.log('Transaction receipt:', transactionReceipt);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to send transaction:', error);
            setIsLoading(false);
        }
    };

    const getRideRequest = async (requestId) => {

        try {
            // Create the contract instance
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Call the rideRequests function
            const rideRequest = await contract.rideRequests(requestId);

            console.log('Ride request:', rideRequest);
        } catch (error) {
            console.error('Failed to get ride request:', error);
        }
    };

    //     const getAllRequestIds = async () => {
    //     try {
    //         // Create the contract instance
    //         const contract = new ethers.Contract(contractAddress, contractABI, signer);

    //         // Get the total number of ride requests
    //         const totalRequests = await contract.rideRequestCount();

    //         // Initialize an array to store the requestIds
    //         let requestIds = [];

    //         // Iterate over the range from 0 to totalRequests - 1
    //         for (let i = 0; i < totalRequests; i++) {
    //             // Call the rideRequests function with each index
    //             const rideRequest = await contract.rideRequests(i);

    //             console.log('Ride request:', rideRequest);

    //             // Add the requestId to the array
    //             requestIds.push(rideRequest.requestId);
    //         }

    //         console.log('Request Ids:', requestIds.map(id => id.toNumber())) ;
    //     } catch (error) {
    //         console.error('Failed to get request Ids:', error);
    //     }
    // };

    const getAllRideRequests = async () => {
        setIsLoading(true);
        try {
            // Create the contract instance
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Get the total number of ride requests
            const totalRequests = await contract.rideRequestCount();

            // Initialize an array to store the ride requests
            let rideRequests = [];

            // Iterate over the range from 0 to totalRequests - 1
            for (let i = 0; i < totalRequests; i++) {
                // Call the rideRequests function with each index
                const rideRequest = await contract.rideRequests(i);

                console.log('Ride request:', rideRequest);

                // Add the ride request to the array
                if (rideRequest[5] === false) {
                    rideRequests.push(rideRequest);
                }
            }

            setRequestedRides(rideRequests);

            console.log('Ride Requests:', rideRequests);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to get ride requests:', error);
            setIsLoading(false);
        }
    }

    const placeBid = async (requestId, bidAmountInRupees) => {
        setIsLoading(true);
        try {
            // Fetch the current exchange rate from a cryptocurrency exchange API
            const exchangeRate = 268873.65; // Replace this with the actual exchange rate

            // Convert rupees to ether
            const bidAmountEther = Number((bidAmountInRupees / exchangeRate).toFixed(18));

            // Convert ether to wei
            const bidAmountWei = ethers.utils.parseEther(bidAmountEther.toString());

            // Create the contract instance
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Send the transaction
            const transactionResponse = await contract.placeBid(requestId, bidAmountWei);

            // Wait for the transaction to be mined
            const transactionReceipt = await transactionResponse.wait();

            console.log('Transaction receipt:', transactionReceipt);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to send transaction:', error);
            setIsLoading(false);
        }
    };

    // const getBid = async (param1, param2) => {
    //     setIsLoading(true);
    //     try {
    //         // Create the contract instance
    //         const contract = new ethers.Contract(contractAddress, contractABI, signer);

    //         // Call the function
    //         const bid = await contract.bids(param1, param2);

    //         console.log('Bid:', bid);
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error('Failed to get bid:', error);
    //         setIsLoading(false);
    //     }
    // };

    const getBids = async (requestId) => {
        setIsLoading(true);
        try {
            // Create the contract instance
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Call the function
            const bids = await contract.getBids(requestId);

            setBids(bids);

            console.log('Bids:', bids);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to get bids:', error);
            setIsLoading(false);
        }
    };

    const acceptBid = async (requestId, bidId) => {
        setIsLoading(true);
        try {
            // Create the contract instance
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Convert requestId and bidId to BigNumber if they're not already
            const requestIdBigNumber = ethers.BigNumber.isBigNumber(requestId) ? requestId : ethers.BigNumber.from(requestId);
            const bidIdBigNumber = ethers.BigNumber.isBigNumber(bidId) ? bidId : ethers.BigNumber.from(bidId);

            // Ensure the rider has approved the contract to spend their tokens
            // const tokenDecimals = 18;
            // const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            // const approveTx = await tokenContract.approve(contractAddress, ethers.utils.parseUnits("0.01", tokenDecimals));
            // await approveTx.wait();

            // Send the transaction with an increased gas limit
            const transactionResponse = await contract.acceptBid(requestIdBigNumber, bidIdBigNumber, {
                gasLimit: ethers.utils.hexlify(2000000), // Increased to 2,000,000 gas units
            });

            // Wait for the transaction to be mined
            const transactionReceipt = await transactionResponse.wait();

            console.log('Transaction receipt:', transactionReceipt);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to send transaction:', error);
            setIsLoading(false);
        }
    };


    return (
        <TransactionContext.Provider value={{ requestRide, connectWallet, getAllRideRequests, isLoading, requestedRides, placeBid, getBids, bids, acceptBid }}>
            {children}
        </TransactionContext.Provider>
    );
};