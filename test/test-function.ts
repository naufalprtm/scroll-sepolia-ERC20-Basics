import { ethers } from "hardhat";
import assert from "node:assert";
import * as dotenv from "dotenv";

dotenv.config();

describe("MyToken", function () {
    let MyToken: any;
    let myToken: any;
    let owner: any;
    let initialSupply: any;
    // Set a global timeout for all tests
    this.timeout(100000); // 100 seconds timeout
    beforeEach(async function () {
        // Get the owner's private key from the environment
        const ownerPrivateKey = process.env.PRIVATE_KEY || "";
        
        // Create a wallet using the owner's private key
        const ownerWallet = new ethers.Wallet(ownerPrivateKey);
        
        // Connect the wallet to a provider (default or custom)
        const provider = new ethers.providers.JsonRpcProvider
        owner = ownerWallet.connect(provider);
        
        // Get the contract factory for MyToken
        MyToken = await ethers.getContractFactory("MyToken", owner);
        
        // Define the initial supply for the token (1000 tokens)
        initialSupply = ethers.utils.parseEther("1000");
        
        // Deploy the contract with the initial supply
        myToken = await MyToken.deploy(initialSupply, {
            gasLimit: 3000000, // Gas limit for deployment
        });

        // Wait for the deployment to be completed
        await myToken.deployed();
        console.log("MyToken deployed to:", myToken.address);
    });

    it("Constructor: Should mint initial supply to deployer", async function () {
        const ownerBalance = await myToken.balanceOf(owner.address);
        assert.strictEqual(
            ownerBalance.toString(),
            initialSupply.toString(),
            "Initial supply should be assigned to the deployer"
        );
    });

    it("Mint: Should mint new tokens to the owner", async function () {
        const mintAmount = ethers.utils.parseEther("100");
        await myToken.mint(owner.address, mintAmount);

        const ownerBalance = await myToken.balanceOf(owner.address);
        assert.strictEqual(
            ownerBalance.toString(),
            initialSupply.add(mintAmount).toString(),
            "Minted amount should be reflected in the owner's balance"
        );
    });

    it("Burn: Should burn tokens from the owner's balance", async function () {
        const burnAmount = ethers.utils.parseEther("50");
        await myToken.burn(owner.address, burnAmount);

        const ownerBalance = await myToken.balanceOf(owner.address);
        assert.strictEqual(
            ownerBalance.toString(),
            ethers.utils.parseEther("950").toString(),
            "Burned tokens should be deducted from owner's balance"
        );
    });

    it("Transfer: Should transfer tokens to another address", async function () {
        const transferAmount = ethers.utils.parseEther("100");
        const recipient = "0xd1fA52045b7Fe76C722A3d9C3AAf0b709128Ab4B"; // Example recipient address

        await myToken.transfer(recipient, transferAmount);

        const recipientBalance = await myToken.balanceOf(recipient);
        const ownerBalance = await myToken.balanceOf(owner.address);

        assert.strictEqual(
            recipientBalance.toString(),
            transferAmount.toString(),
            "Transferred tokens should be reflected in the recipient's balance"
        );
        assert.strictEqual(
            ownerBalance.toString(),
            ethers.utils.parseEther("900").toString(),
            "Sender's balance should be reduced"
        );
    });

    it("Approve: Should allow the owner to approve spending tokens", async function () {
        const approveAmount = ethers.utils.parseEther("200");
        await myToken.approve(owner.address, approveAmount);

        const allowance = await myToken.allowance(owner.address, owner.address);
        assert.strictEqual(
            allowance.toString(),
            approveAmount.toString(),
            "Approved amount should be set correctly"
        );
    });

    it("TransferFrom: Should allow a spender to transfer tokens on behalf of the owner", async function () {
        const approveAmount = ethers.utils.parseEther("200");
        const spender = ethers.Wallet.createRandom().connect(ethers.getDefaultProvider()); // Create a random spender
    
        // Fund the spender with some ether if necessary
        await owner.sendTransaction({
            to: spender.address,
            value: ethers.utils.parseEther("1.0") // Send 1 Ether to the spender
        });
    
        // Approve the spender to spend tokens
        await myToken.approve(spender.address, approveAmount);
        const transferAmount = ethers.utils.parseEther("100");
        
        // Connect the spender to the contract
        const myTokenAsSpender = myToken.connect(spender);
    
        // Transfer tokens from the owner to another address using transferFrom
        await myTokenAsSpender.transferFrom(owner.address, spender.address, transferAmount);
    
        const recipientBalance = await myToken.balanceOf(spender.address);
        const ownerBalance = await myToken.balanceOf(owner.address);
    
        assert.strictEqual(
            recipientBalance.toString(),
            transferAmount.toString(),
            "Transferred tokens should be reflected in the recipient's balance"
        );
        assert.strictEqual(
            ownerBalance.toString(),
            ethers.utils.parseEther("900").toString(),
            "Sender's balance should be reduced"
        );
    });    
});
