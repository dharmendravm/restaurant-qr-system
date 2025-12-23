import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ACCESS_TOKEN_SECRET } from "../config.js";
import dotenv from 'dotenv';
dotenv.config();

// Verify Access Token
export const verifyToken = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // No Token Provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next({
        statusCode: 401,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    // Verify Access Token
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password -refreshToken");
    if (!user) {
      return next({ statusCode: 400, message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    // Invalid token
    if (error.name === "JsonWebTokenError") {
      return next({ statusCode: 401, message: "Invalid token" });
    }

    // Token expired
    if (error.name === "TokenExpiredError") {
      return next({ statusCode: 401, message: "Token expired" });
    }
    next(error);
  }
};



// verify SessionToken 
export const verfiySessionToken = (req, res, next) => {
  try {
    const sessionHead = req.headers.authorization;
    if(!sessionHead || !sessionHead.startsWith("Bearer ")){
      return next({
        statusCode: 401,
        message: "Access denied. No session token provided.",
      });
    }

    const token = sessionHead.split(" ")[1];
    // Verify Session Token
    const decoded = jwt.verify(token, JWT_SECRET || process.env.JWT_SECRET);

    // Fetch user 

  } catch (error) {
    
  }
}