import { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

// Create the TransactionContext
export const TransactionContext = createContext();

// Create the TransactionContextProvider component
export const TransactionContextProvider = ({ children }) => {

    // State to store the current account
    const [currentAccount, setCurrentAccount] = useState("");
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    const connectWallet = async () => {
        // try {
        if (!ethereum) {
            alert("Get MetaMask!");
            return;
        }
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
        // } catch (error) {
        //     console.log(error);
        //     alert("Error connecting to MetaMask");
        // }
    };

    useEffect(() => {
        // Connect to MetaMask provider
        connectWallet();
    }, []);

    if (window.ethereum && currentAccount.length === 0) {
        connectWallet();
    }

    // Function to sign the transaction
    const signTransaction = async (location, destination, startingBid, amountToApprove) => {
        try {
            // Get the contract address and ABI
            const contractAddress = contractAddress;
            const contractABI = contractABI;

            // Create the contract instance
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Sign the transaction
            const transaction = await contract.createRideRequest(location, destination, startingBid, amountToApprove);
            const signedTransaction = await signer.sendTransaction(transaction);

            console.log('Signed transaction:', signedTransaction);
        } catch (error) {
            console.error('Failed to sign transaction:', error);
        }
    };

    return (
        <TransactionContext.Provider value={{ signTransaction, connectWallet }}>
            {children}
        </TransactionContext.Provider>
    );
};