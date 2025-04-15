import express, {Request, Response, NextFunction} from "express";
import { PORT } from "./config/config";


const app = express();

app.use('/', async(req : Request, res : Response, next : NextFunction)=>{
    res.send("API Gateway Running");
});


app.listen(PORT, ()=>{
    console.log(`API Gateway running on PORT: ${PORT}`);
})
