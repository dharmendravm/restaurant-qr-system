import express from "express";
import cors from "cors";
import "./globallogs.js";
import ConnectDB from "./config/database.js";
import { PORT } from "./config.js";

import authRoutes from "./router/auth.route.js";
import sessionRoute from "./router/session.route.js";
import tableRoute from "./router/table.route.js";
import menuRoutes from "./router/menu.route.js";
import getTotalUsers from "./router/user.route.js";
import { errorHandler, notFound } from "./middlewares/errormiddleware.js";
import cartRoute from "./router/cart.route.js";

const app = express();

// Middlewares
app.use(express.json());

app.use(cors());
// CORS
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "https://restaurant-app-gold-three.vercel.app",
//       "http://192.168.1.5:5173"
//     ],
//   })
// );

// DB Connect
await ConnectDB();

// Base Route
app.get("/", (req, res) => {
  res.send("Server is Live");
});

// Api Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", sessionRoute);
app.use("/api/v1", tableRoute);
app.use('/api/v1' , menuRoutes);
app.use('/api/v1/cart', cartRoute)

// User Routes
app.use("/api/v1", getTotalUsers);

// 404 Handler
app.use(notFound);

// Galobal Error Handler
app.use(errorHandler);

// Server
const server = app.listen(PORT, () => {
  console.log(`Server is Running on Port: ${PORT}`);
});