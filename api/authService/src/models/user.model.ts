import { UUIDTypes } from "uuid";
import sequelize from "../config/db";
import { DataTypes, Model } from "sequelize";

class User extends Model{
    id!: UUIDTypes;
    email!: string;
    password!: string;
    aadhar_id!: string;
}

User.init({
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
    },
    email : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    aadhar_id : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
},
{
    sequelize,
    modelName : "users",
    tableName : "users",
});

export default User;