import express from "express";
import cors from "cors";
import './globallogs.js'
import ConnectDB from "./config/database.js";
import { PORT } from "./config.js";

import authRoutes from "./router/auth.route.js";
import tableRoute from "./router/table.route.js";
import menuRoute from "./router/menu.route.js";
import getTotalUsers from "./router/user.route.js";
import { errorHandler, notFound } from "./middlewares/errormiddleware.js";

const app = express();

// Middlewares
app.use(express.json());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://restaurant-app-gold-three.vercel.app"
    ],
  })
);

// DB Connect
await ConnectDB();


// Base Route
app.get("/", (req, res) => {
  res.send("Server is Live");
});


// Api Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", tableRoute);
app.use("/api/v1",menuRoute);

// User Routes
app.use("/api/v1", getTotalUsers);

// 404 Handler
app.use(notFound);

// Galobal Error Handler
app.use(errorHandler);

// Server
app.listen(PORT, () => {
  logServer(`Server is Running on Port: ${PORT}`);
});
