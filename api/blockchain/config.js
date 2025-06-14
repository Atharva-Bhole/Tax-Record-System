import dotenv from 'dotenv';
dotenv.config();

export const rpcUrl =  process.env.RPC_URL || 'http://localhost:7545';
export const privateKey = process.env.PRIVATE_KEY || '0xYOUR_PRIVATE_KEY_HERE';
export const contractAddress = process.env.CONTRACT_ADDRESS || '0xYOUR_CONTRACT_ADDRESS_HERE';