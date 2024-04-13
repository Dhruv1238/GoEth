const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Lock = await hre.ethers.getContractFactory("Lock");

  // Deploy the contract
  // Get current Unix timestamp and add 24 hours to it
  const _unlockTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

  // Deploy the contract with _unlockTime argument
  const lock = await Lock.deploy(_unlockTime);

  // Log the contract address
  console.log("Lock contract deployed to:", lock.address);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
