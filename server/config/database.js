import mongoose from "mongoose";
import { MONGO_URI } from "../config.js";

// Connect to the mongodb database
const ConnectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}`)

    logDB("DB connected successfully");
  } catch (error) {
    logDB("DB connection error", error.message);
  }
};

export default ConnectDB;