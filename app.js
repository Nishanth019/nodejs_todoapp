import express from "express";
export const app = express();
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

import cors from 'cors';
config({
    path:"./data/config.env"
})

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","PATCH","DELETE"],
    credentials: true,
}))

//using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

//using routes
app.use('/api/v1/users',userRouter)
app.use('/api/v1/task',taskRouter)

app.get("/",(req,res)=>{
    res.send("hello mother fucker!!")
})

app.use(errorMiddleware)

