import dotenv from "dotenv";
import app from "../src/app.js";
import ConnectDB from "../src/config/database.js";

dotenv.config();

export default async function handler(req, res) {
  try {
    await ConnectDB();
    return app(req, res);
  } catch (error) {
    console.error("Vercel handler error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
