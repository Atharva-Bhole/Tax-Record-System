import { configDotenv } from "dotenv";

configDotenv();

export const PORT:number = parseInt(process.env.PORT as string) || 5454;
export const WEB_SERVICE:string = process.env.WEB_SERVICE || 'http://localhost:5001';
export const BLOCKCHAIN_SERVICE:string = process.env.BLOCKCHAIN_SERVICE || "http://localhost:5002";
