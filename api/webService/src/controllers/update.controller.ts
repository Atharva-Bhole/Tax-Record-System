import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const updateUser = async(req : Request, res : Response, next : NextFunction):Promise<void>=>{
    try{
        const data = req.body;
        if(!data){
            res.status(400).json({
                success : false,
                message : "Please provide all details to update the user"
            });
            return;
        }

        const updatedUser = await User.update(data, {
            where : {
                id : req.user?.id
            },
            returning : true,
        });

        if(!updatedUser){
            res.status(404).json({
                success : false,
                message : "Failed to update user"
            });
            return;
        }

        req.user = updatedUser[1][0];

        res.status(200).json({
            success : true,
            message : "User updated successfully",
            user : updatedUser[1][0]
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