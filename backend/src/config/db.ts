import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config";

const sequelize = new Sequelize({
    database : DB_NAME,
    username : DB_USER,
    password : DB_PASSWORD,
    host : DB_HOST,
    port : DB_PORT,
    dialect : "postgres",
    dialectOptions : {
        ssl : {
            require : true,
            rejectUnauthorized : false     // Self-signed certificates are allowed
        }
    },
    logging : console.log,
})


export default sequelize;