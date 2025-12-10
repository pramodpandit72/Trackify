import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log("Attempting to connect to MongoDB...");
  if (!uri) {
    throw new Error("MONGODB_URI not set in environment");
  }
  const fullUri = `${uri}/${DB_NAME}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(fullUri);
    console.log("✅ Connected to MongoDB successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;