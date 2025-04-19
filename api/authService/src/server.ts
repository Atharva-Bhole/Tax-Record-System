import express, { NextFunction, Request, Response, Application } from "express";
import { PORT } from "./config/config";

import authRoutes from "./routes/auth.route";

const app:Application = express();

app.get('/', async(req : Request, res : Response, next : NextFunction):Promise<void>=>{
    res.status(200).json({
        message : "Auth Service Running"
    });
    return;
})

app.use('/api/v1', authRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})