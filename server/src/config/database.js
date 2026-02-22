import mongoose from "mongoose";

let cachedConnection = null;

// Connect to MongoDB once and reuse the same connection.
const ConnectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }

  cachedConnection = await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected successfully");
  return cachedConnection;
};

export default ConnectDB;
