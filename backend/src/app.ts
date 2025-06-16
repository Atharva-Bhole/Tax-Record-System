import express, {Request, Response, NextFunction} from "express";
import { PORT } from "./config/config";

const app = express();

app.use('/', async (req : Request, res : Response, next : NextFunction):Promise<void>=>{
    try{
        res.status(200).json({
            success : true,
            message : "Tax Chain API Running"
        })
    }catch(err){
        console.error(err);
        res.status(500);
    }
})


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})