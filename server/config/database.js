import mongoose from "mongoose";
import { MONGO_URI } from "../config.js";

// Connect to the mongodb database
const ConnectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}`)

    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection error", error.message);
  }
};

export default ConnectDB;