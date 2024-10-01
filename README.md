# scroll-sepolia-ERC20-Basics

This repository contains a basic implementation of an ERC20 token called `MyToken` using Hardhat and OpenZeppelin. The token supports minting, burning, transferring, and approving functionality.

## Table of Contents

- [Installation](#installation)
- [Contract Overview](#contract-overview)
- [Deployment](#deployment)
- [Testing](#testing)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/naufalprtm/scroll-sepolia-ERC20-Basics.git
   cd scroll-sepolia-ERC20-Basics
   ```

2. Install the necessary dependencies:
   ```
    npm install

   ```
   or
   ```
   npm install --legacy-peer-deps
   ```

## Contract Overview
MyToken.sol
The MyToken contract is an implementation of the ERC20 standard with the following features:
- `Minting`: Allows new tokens to be created and assigned to a specified address.
- `Burning`: Allows tokens to be destroyed from a specified address.
- `Transfer`: Allows the owner to transfer tokens to another address.
- `Approval`: Allows the owner to approve a spender to spend a certain amount of tokens on their behalf.
- `TransferFrom`: Allows a spender to transfer tokens from the owner's account to another account.

## To run the deployment script, execute:
   ```
npx hardhat run scripts/deploy.ts --network scrollSepolia
   ```
   ```   
npx hardhat test --network scrollSepolia
   ```

   ```
npx hardhat run scripts/deploy.ts --network localhost
   ```
   ```   
npx hardhat test --network localhost
   ```