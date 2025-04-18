import { Sequelize } from "sequelize";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "./config";

const sequelize = new Sequelize({
    database : DATABASE_NAME,
    host : DATABASE_HOST,
    password : DATABASE_PASSWORD,
    port : DATABASE_PORT,
    username : DATABASE_USER,
    logging : console.log
});

export default sequelize;