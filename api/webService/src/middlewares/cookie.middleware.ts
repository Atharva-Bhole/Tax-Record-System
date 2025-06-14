import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from "jsonwebtoken";
import User from '../models/user.model';
import { JWT_SECRET } from '../config/config';
import logger from '../utils/logger';

export const authMiddleware = async(req: Request, res: Response, next:NextFunction):Promise<void>=>{
    try{
        logger.info("Auth Middleware triggered");
        const token = req.cookies.token;
        if(!token){
            res.status(401).json({
                success: false,
                message: "Unauthorized access, please login"
            });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if(!decoded || !decoded.id){
            res.status(401).json({
                success: false,
                message: "Invalid token, please login again"
            });
            return;
        }

        const user = await User.findByPk(decoded.id);
        if(!user){
            res.status(404).json({
                success: false,
                message: "User not found, please register"
            });
            return;
        }
        req.user = user;
        logger.info("User authenticated successfully");
        next();
    }catch(err){
        console.error("Auth Middleware Error: ", err);
    }
}

export const adminMiddleware = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        logger.info("Admin Middleware triggered");
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({
                success: false,
                message: "Access denied, admin privileges required"
            });
            return;
        }
        logger.info("User is an admin, proceeding to next middleware");
        next();
    } catch (err) {
        console.error("Admin Middleware Error: ", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err
        });
    }
}