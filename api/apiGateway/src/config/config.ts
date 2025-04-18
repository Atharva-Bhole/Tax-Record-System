import { configDotenv } from "dotenv";

configDotenv();

export const PORT:number = parseInt(process.env.PORT as string) || 5454;
export const AUTH_SERVICE:string = process.env.AUTH_SERVICE || 'http://localhost:5001';
export const BLOCKCHAIN_SERVICE:string = process.env.BLOCKCHAIN_SERVICE || "http://localhost:5002";
export const FUND_ALLOCATION_SERVICE:string = process.env.FUND_ALLOCATION_SERVICE || "http://localhost:5003";
export const NOTIFICATION_SERVICE:string = process.env.NOTIFICATION_SERVICE || "http://localhost:5004";
export const TAX_PAYMENT_SERVICE:string = process.env.TAX_PAYMENT_SERVICE || "http://localhost:5005";
export const ADMIN_SERVICE:string = process.env.ADMIN_SERVICE || "http://localhost:5006";
export const ANALYTICS_TRANSPARENCY_SERVICE = process.env.ANALYTICS_TRANSPARENCY_SERVICE || "http://localhost:5007";