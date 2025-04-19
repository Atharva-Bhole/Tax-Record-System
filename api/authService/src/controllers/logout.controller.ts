import { Request, Response, NextFunction } from "express";

export const LogOut = async(req : Request, res : Response, next : NextFunction):Promise<void> =>{
    try{
        res.clearCookie("token");
        res.status(200).json({
            success : true,
            message : "Logged Out Successfully"
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