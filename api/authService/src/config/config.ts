import { configDotenv } from "dotenv";

configDotenv();

export const PORT = parseInt(process.env.PORT as string) || 5001;
export const DATABASE_NAME = process.env.DATABASE_NAME || "postgres";
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "admin";
export const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT as string) || 5432;
export const DATABASE_USER = process.env.DATABASE_USER || "postgres";
export const JWT_SECRET = process.env.JWT_SERCRET || "3wrofnornwgfwoernf23rniwofwvnppcnwe";