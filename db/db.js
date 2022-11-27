import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDb= ()=>{
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.rlq8ig9.mongodb.net/?retryWrites=true&w=majority`).catch(err=>console.log(err));

};

export default connectToDb;




