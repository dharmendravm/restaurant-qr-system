import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import apiRoutes from "./router/index.js";
import { globalErrorHandler, notFound } from "./middlewares/errormiddleware.js";

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-session-token"],
  }),
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.use("/api/v1", apiRoutes);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
