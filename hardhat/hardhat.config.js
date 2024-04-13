require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia: {
      url: API_URL, // Make sure this points to the Sepolia RPC URL
      accounts: [`0x${PRIVATE_KEY}`] // Your account's private key for the Sepolia network
    },
  }
};