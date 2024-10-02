import { ethers } from "hardhat";

async function main() {

    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);


    const initialOwner = deployer.address; 


    const NewMyToken = await ethers.getContractFactory("NewMyToken");


    const token = await NewMyToken.deploy(initialOwner);

    console.log("NewMyToken deployed to:", token.address);


    await token.deployed();
    console.log("Contract deployed successfully!");
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
