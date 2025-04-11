import express, {Request, Response, NextFunction} from "express";

const app = express();

app.use('/', async (req : Request, res : Response, next : NextFunction):Promise<void>=>{
    try{
        res.status(200).json({
            success : true,
            message : "Event Management API Running"
        })
    }catch(err){
        console.error(err);
        res.status(500);
    }
})