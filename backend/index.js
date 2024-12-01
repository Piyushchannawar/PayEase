// importing dependency
import express from "express";
import dotenv from "dotenv";
import cors from "cors";



import connectToDb from "./config/connectToDb.js";
import router from './routes/index.js'
import cookieParser from "cookie-parser";
// configure dotenv
dotenv.config();

// initilize an express function
const app = express();

// Connect to database
connectToDb();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1",router)






app.get("/",(req,res)=>{
    res.json({Hello: "World"})
})


// Listning on some port
app.listen(process.env.PORT,()=>{
    console.log("Listning on port " + process.env.PORT);
    
})