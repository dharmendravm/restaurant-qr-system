import mongoose from "mongoose";


// Function to Connect to the mongodb database
const ConnectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`)

    console.log("DB connected successfully ");
  } catch (error) {
    console.error("DB connection error", error.message);
  }
};

export default ConnectDB;