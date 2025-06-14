import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from "jsonwebtoken";
import User from '../models/user.model';

export const authMiddleware = async(req: Request, res: Response, next:NextFunction):Promise<void>=>{
    try{

    }catch(err){
        
    }
}