import { UUIDTypes } from "uuid";
import sequelize from "../config/db";
import {DataTypes, Model} from "sequelize";

class Bank extends Model{
    id!: UUIDTypes;
    user_id! : UUIDTypes;
    bank_id! : string;
    ifsc_code! : string;
    bank_name! : string;
}

Bank.init({
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false,
    },
    user_id : {
        type : DataTypes.UUID,
        references : {
            model : "users",
            key : "id"
        }
    },
    bank_id : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    ifsc_code : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    bank_name : {
        type : DataTypes.STRING,
        allowNull : false,
    }
},{
    sequelize
});


export default Bank;