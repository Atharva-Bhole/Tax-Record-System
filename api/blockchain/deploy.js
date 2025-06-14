import { ethers } from 'ethers';
import { readFileSync, writeFileSync } from 'fs';
import { rpcUrl, privateKey, contractAddress } from './config.js';
import { config } from 'dotenv';
import solc from 'solc';
import fs from 'fs';

config();

async function main() {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    if (contractAddress && contractAddress !== '0xYOUR_CONTRACT_ADDRESS_HERE') {
        console.log("Contract already deployed at:", contractAddress);
        return;
    }

    const source = readFileSync('./chain.sol', 'utf8');

    const input = {
        language: 'Solidity',
        sources: {
            'chain.sol': {
                content: source
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode']
                }
            }
        }
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    const contractName = Object.keys(output.contracts['chain.sol'])[0]; // Dynamically get contract name
    console.log("Compiled contract:", contractName);

    const contractFile = output.contracts['chain.sol'][contractName];
    const bytecode = contractFile.evm.bytecode.object;
    const abi = contractFile.abi;

    writeFileSync('./abi.json', JSON.stringify(abi, null, 2));

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    const deployedAddress = contract.target;
    console.log("Contract deployed at address:", deployedAddress);
    console.log("Transaction hash:", contract.deployTransaction.hash);

    // Save to .env
    const envPath = './.env';
    let envContent = readFileSync(envPath, 'utf8');

    if (envContent.includes("CONTRACT_ADDRESS=")) {
        envContent = envContent.replace(/CONTRACT_ADDRESS=.*/g, `CONTRACT_ADDRESS=${deployedAddress}`);
    } else {
        envContent += `\nCONTRACT_ADDRESS=${deployedAddress}`;
    }

    writeFileSync(envPath, envContent);
    console.log("Contract address saved to .env");
}

main().catch((error) => {
    console.error("Error deploying contract:", error.message || error);
});
