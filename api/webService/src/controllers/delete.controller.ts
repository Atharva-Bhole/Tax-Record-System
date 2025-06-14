import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const deleteUser = async(req : Request, res : Response, next : NextFunction):Promise<void> =>{
    try{
        const delUser = await User.destroy({
            where : {id : req.user?.id},
        });

        if(!delUser){
            res.status(404).json({
                success : false,
                message : "User not found"
            });
            return;
        }

        res.status(200).json({
            success : true,
            message : "Deleted your account successfully"
        });
        return;

    }catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : err
        });
    }
}