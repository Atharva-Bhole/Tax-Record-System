import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from "jsonwebtoken";
import User from '../models/user.model';

declare namespace Express{
    export interface Request{
        user?:any;
    }
}
