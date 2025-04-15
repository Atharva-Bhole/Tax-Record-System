import { configDotenv } from "dotenv";


configDotenv();

// Main Server config
export const PORT:number = parseInt(process.env.PORT as string) || 5454;


// DB Config
export const DB_NAME:string = process.env.DB_NAME || "postgres";
export const DB_USER:string = process.env.DB_USER || "postgres";
export const DB_PASSWORD:string = process.env.DB_PASSWORD || "admin";
export const DB_HOST:string = process.env.DB_HOST || "localhost";
export const DB_PORT:number = parseInt(process.env.DB_PORT as string) || 3306;