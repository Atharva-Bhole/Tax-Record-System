// Import base libraries
import express, {Request, Response, NextFunction} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Import models
import User from "../models/user.model";
import Bank from "../models/bank.model";

// Import Types
import { LoginByEmailControllerType } from "../types/controller.type";
import { JWT_SECRET } from "../config/config";


// Sign JWT 
const signToken = (id : string, email : string, aadhar_id : string)=>{
    return jwt.sign({id, email, aadhar_id}, JWT_SECRET, {
        expiresIn : '7d'
    });
}

// Send JWT to client
const sendToken = (user : User, statusCode : number, res : Response):void=>{
    const token = signToken(user.getDataValue("id"), user.getDataValue("email"), user.getDataValue("aadhar_id"));

    user.setDataValue("password", undefined);
    if(!res.headersSent){
        res.status(statusCode).cookie("token", token, {
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV === "production",
            maxAge : 30 * 24 * 60 * 60 * 1000
        }).json({
            success : true,
            token,
            user
        });
    }
}

// Main Controllers Code
export const LoginByEmail = async(req : Request<{},{}, LoginByEmailControllerType>, res : Response, next : NextFunction):Promise<void>=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                success : false,
                message : "Please provide complete details"
            });
            return;
        }

        const user = await User.findOne({
            where : {
                email : email
            }
        });

        if(!user){
            res.status(404).json({
                success : false,
                message : "User not found"
            });
            return;
        }

        // Check password here
        const isCorrect = await bcrypt.compare(password, user!.password);
        if(!isCorrect){
            res.status(401).json({
                success : false,
                message : "Invalid Credentials"
            });
            return;
        }
        
        // Send Cookie
        sendToken(user, 200, res);
        
        // Send Success Response

        res.status(200).json({
            success : true,
            message : "Login Success",
            user
        });

        return;

    }catch(err){
        console.error(err);
        res.status(500).json({
            message : "INTERNAL SERVER ERROR",
            error : err
        });
        return;
    }
}