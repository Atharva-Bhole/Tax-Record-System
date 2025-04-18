import express, { NextFunction, Request, Response, Application } from "express";
import { PORT } from "./config/config";

const app:Application = express();

app.get('/', async(req : Request, res : Response, next : NextFunction):Promise<void>=>{
    res.status(200).json({
        message : "Auth Service Running"
    });
    return;
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})