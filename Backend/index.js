import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connecDB from './Config/db.js';
import UserRouter from './Router/userRoute.js';
import ProductRoute from './Router/ProductRoute.js';
import warrantyReminder from './Controller/warrantyReminder.js';
const app=express()
app.use(cookieParser())
app.use(express.json());
//app.use(cors())
//permission like fronted
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
// api
app.use('/',UserRouter)
app.use("/product",ProductRoute)
app.get("/",(req,res)=>{
    res.send("Vishal")
})
connecDB().then(()=>{
    warrantyReminder()
    app.listen(5000,()=>{
        console.log("Server is running");
        
    })
})