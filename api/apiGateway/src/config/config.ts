import { configDotenv } from "dotenv";

configDotenv();

export const PORT:number = parseInt(process.env.PORT as string) || 5454;