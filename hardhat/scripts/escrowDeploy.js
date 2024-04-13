// scripts/deploy_goethescrow.js

async function main() {
    const GoEthEscrow = await ethers.getContractFactory("GoEthEscrow");
    const initialSupply = 1000000; // Example initial supply
    const goEthEscrow = await GoEthEscrow.deploy(initialSupply);

    console.log("GoEthEscrow deployed to:", goEthEscrow.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
