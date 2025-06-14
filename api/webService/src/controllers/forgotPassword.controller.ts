import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

const sendOTP = async(mobile_no:number)=>{
    // Send OTP Function using SMTP
}


export const forgotPassword = async(req : Request, res : Response, next : NextFunction):Promise<void>=>{
    try{
        const otp = req.body.otp;
        if(!otp){
            res.status(400).json({
                success : false,
                message : "Please provide OTP"
            });
            return;
        }
        
        const cookie = req.cookies('otp');
        if(!cookie){
            res.status(404).json({
                success : false,
                message : "Please Send the OTP first from the web"
            });
            return;
        }

        const isCorrect = await bcrypt.compare(otp, cookie);
        if(!isCorrect){
            res.status(401).json({
                success : false,
                message : "Invalid OTP entered"
            });
            return;
        }

        res.status(200).json({
            success : true,
            message : "OTP is valid please enter new password"
        });
        return;
    }catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : err
        });
        return;
    }
}