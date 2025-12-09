import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI not set in environment");
  }
  const fullUri = `${uri}/${DB_NAME}?retryWrites=true&w=majority`;
  return mongoose.connect(fullUri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  });
};

export default connectDB;