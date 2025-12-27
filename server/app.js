import express from "express";
import cors from "cors";
import "./globallogs.js";
import { PORT } from "./config.js";
import ConnectDB from "./config/database.js";

import adminMenuRoutes from "./router/admin/menu.route.js";
import adminCouponRoutes from "./router/admin/coupon.route.js";
import adminUserRoutes from "./router/admin/user.route.js";
import adminTableRoutes from "./router/admin/table.route.js";

import authRoutes from "./router/auth.route.js";
import sessionRoute from "./router/session.route.js";
import tableRoute from "./router/table.route.js";
import menuRoutes from "./router/menu.route.js";
import orderRoute from './router/order.route.js';
import cartRoute from "./router/cart.route.js";
import couponRoute from './router/coupen.route.js'
import { errorHandler, notFound } from "./middlewares/errormiddleware.js";

const app = express();

// Middlewares
app.use(express.json());

app.use(cors());
// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://restaurant-app-gold-three.vercel.app",
      "http://192.168.1.5:5173"
    ],
  })
);

// DB Connect
await ConnectDB();

// Base Route
app.get("/", (req, res) => {
  res.send("Server is Live");
});

// Admin Routes
app.use('/api/v1/admin/users', adminUserRoutes);
app.use('/api/v1/admin/coupons', adminCouponRoutes);
app.use('/api/v1/admin/menu', adminMenuRoutes);
app.use('/api/v1/admin/tables', adminTableRoutes);

// Api Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", sessionRoute);
app.use("/api/v1/tables", tableRoute);
app.use('/api/v1' , menuRoutes);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/coupons', couponRoute)

// User Routes
// app.use("/api/v1", getTotalUsers);

// 404 Handler
app.use(notFound);

// Galobal Error Handler
app.use(errorHandler);

// Server
const server = app.listen(PORT , "0.0.0.0", () => {
  console.log(`Server is Running on Port: 0.0.0.0 : ${PORT}"`);
});