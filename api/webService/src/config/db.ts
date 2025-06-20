import { Sequelize } from "sequelize";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "./config";
import logger from "../utils/logger";

const sequelize = new Sequelize({
    database : DATABASE_NAME,
    host : DATABASE_HOST,
    password : DATABASE_PASSWORD,
    port : DATABASE_PORT,
    username : DATABASE_USER,
    logging : logger.info,
});

export default sequelize;