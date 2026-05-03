import mongoose from "mongoose";
import config from "./configs.js";

const connectDB = async () => {
 await mongoose.connect(config.MONGO_URI)
 console.log("Database Connected Successfully");
 
}

export default connectDB;
