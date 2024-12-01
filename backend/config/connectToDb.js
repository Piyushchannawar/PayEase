import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected");
        
    } catch (error) {
        console.log(error);
    }
   
}

export default connectToDb;