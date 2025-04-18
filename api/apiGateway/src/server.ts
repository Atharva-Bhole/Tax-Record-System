import express, {Request, Response, NextFunction} from "express";
import { ADMIN_SERVICE, ANALYTICS_TRANSPARENCY_SERVICE, AUTH_SERVICE, BLOCKCHAIN_SERVICE, FUND_ALLOCATION_SERVICE, NOTIFICATION_SERVICE, PORT, TAX_PAYMENT_SERVICE } from "./config/config";
import { createProxyMiddleware } from "http-proxy-middleware";
import cookieParser from "cookie-parser";
import axios from "axios";
import cors from "cors";

const app = express();

const service:{[key : string]: string} = {
    '/auth' : AUTH_SERVICE,
    '/blockchain' : BLOCKCHAIN_SERVICE,
    '/funds' : FUND_ALLOCATION_SERVICE,
    '/notification' : NOTIFICATION_SERVICE,
    '/tax' : TAX_PAYMENT_SERVICE,
    '/admin' : ADMIN_SERVICE,
    '/analytics' : ANALYTICS_TRANSPARENCY_SERVICE
}

Object.entries(service).forEach(([route, target])=>{
    app.use(route, createProxyMiddleware({target, changeOrigin:true, pathRewrite: {[`^${route}`] : ""}}));
})

app.use(cors({
    origin : "http://localhost:8080", // Replace with frontend port
    methods : ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders : ['Content-Type']
}));

app.use('/', async(req : Request, res : Response, next : NextFunction)=>{
    res.send("API Gateway Running");
});

app.listen(PORT, ()=>{
    console.log(`API Gateway running on PORT: ${PORT}`);
})
