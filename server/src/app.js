import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import ConnectDB from "./config/database.js";
import apiRoutes from "./router/index.js";
import { globalErrorHandler, notFound } from "./middlewares/errormiddleware.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://restaurant-app-gold-three.vercel.app",
    ],

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-session-token"],
  }),
);

app.options("*", cors());
app.use(express.json());

ConnectDB();

app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.use("/api/v1", apiRoutes);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
