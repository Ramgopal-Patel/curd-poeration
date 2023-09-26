import express from "express";
import connectToDb from "./config/db.js";
import cors from "cors"
import  configDotenv  from "dotenv";
configDotenv.config()
import router from "./routers/userRouter.js";

const app=express();

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/',router)

// connect to db
connectToDb();


export default app;