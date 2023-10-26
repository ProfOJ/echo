import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying TransactionContract with the account:", deployer.address);

    const transactionContract = await ethers.deployContract("TransactionContract");

    console.log("Transactions address:", await transactionContract.getAddress());

    // const TransactionContract = await ethers.getContractFactory("TransactionContract");
    // const transactionContract = await TransactionContract.deploy();

    // await transactionContract.deployed();

    // console.log("TransactionContract address:", transactionContract.address);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
