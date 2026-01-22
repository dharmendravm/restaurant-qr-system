import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import transporter from "../services/email/email.service.js";
import registerTemplate from "../services/email/templates/registerTemplate.js";
import AppError from "../utils/appError.js";
import { comparePassword, hashPassword } from "../utils/password.js";

// Register new user
export const register = async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  try {
    if (!name || !email || !phone || !password) {
      return next(new AppError("All fields are required", 400));
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase();

    // Check if User is Existing
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return next(new AppError("Account already exists", 400));
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    const data = {
      name,
      email: normalizedEmail,
      phone,
      password: passwordHash,
    };

    const newUser = await User.create(data);

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: newUser.email,
      subject: "Welcome to TableOrbit 🎉 | 30% OFF Inside",
      html: registerTemplate({
        customerName: newUser.name,
        orderLink: process.env.FRONTEND_URL,
      }),
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: userResponse,
    });
  } catch (error) {
    next(error);
    console.log(error);
    
  }
};

// User Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }
    // Check user exists
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return next(new AppError("Invalid email or password", 400));
    }

    // Compare password
    const isPasswordMatch = await comparePassword(password, user.password)

    if (!isPasswordMatch) {
      return next(new AppError("Invalid email or password", 400));
    }

    // Generate tokens
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    user.lastLogin = new Date();

    await user.save();

    // Remove password before sending
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: userResponse,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new AppError("Refresh token missing", 400));
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      return next(new AppError("Invalid or expired refresh token", 401));
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return next(new AppError("Unauthorized", 401));
    }

    if (
      !user.refreshTokenExpiresAt ||
      user.refreshTokenExpiresAt.getTime() < Date.now()
    ) {
      return next(new AppError("Refresh token expired", 401));
    }

    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};