import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ACCESS_TOKEN_SECRET } from "../config.js";
import dotenv from 'dotenv';
import AppError from '../utils/appError.js'
dotenv.config();

// Verify Access Token
export const verifyToken = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // No Token Provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Access denied. No token provided.", 401));
    }

    const token = authHeader.split(" ")[1];
    // Verify Access Token
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password -refreshToken");
    if (!user) {
        return next(new AppError("Unauthorized", 400));
    }
    req.user = user;
    next();
  } catch (error) {
    // Invalid token
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid Token", 401));
    }

    // Token expired
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired", 401));
    }
    next(error);
  }
};