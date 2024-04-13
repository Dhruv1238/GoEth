// scripts/deploy_goeth.js
require('dotenv').config();

const {PRIVATE_KEY, ESCROW_ADDRESS } = process.env;

async function main() {
  // Get the ContractFactory for the GoEth contract
  const GoEth = await ethers.getContractFactory("GoEth");

  // Specify the address of the ERC20 token contract and the owner address
  // Replace these with the actual addresses
  const tokenAddress = ESCROW_ADDRESS;
  const ownerAddress = "0x38E4eFC439Ef728716511817F0a508F53252c2b9";

  // Deploy the GoEth contract
  const goEth = await GoEth.deploy(tokenAddress, ownerAddress);

  // Wait for the deployment to be mined
  // await goEth.deployed();

  console.log("GoEth deployed to:", goEth.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
