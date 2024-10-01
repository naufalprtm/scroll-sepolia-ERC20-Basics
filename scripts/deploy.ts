import { ethers } from "hardhat";

async function main() {

  const MyToken = await ethers.getContractFactory("MyToken");

  const initialSupply = ethers.utils.parseEther("1000");

  const myToken = await MyToken.deploy(initialSupply);

  await myToken.deployed();

  console.log(`MyToken deployed to: ${myToken.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
