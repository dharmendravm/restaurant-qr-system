import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import transporter from "../services/emailService.js";
import registerTemplate from "../services/emailtemplates/registerTemplate.js";
import { MAIL_USER, REFRESH_TOKEN_SECRET } from "../config.js";
import AppError from "../utils/appError.js";

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
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

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
      from: MAIL_USER,
      to: newUser.email,
      subject: "Welcome to TableOrbit 🎉 | 30% OFF Inside",
      html: registerTemplate({
        customerName: newUser.name,
        orderLink: "https//",
      }),
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: userResponse,
    });
  } catch (error) {
    next(error);
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
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return next(new AppError("Invalid email or password", 400));
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

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
      return next({ statusCode: 400, message: "Refresh token missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch {
      return next({
        statusCode: 401,
        message: "Invalid or expired refresh token",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return next({ statusCode: 401, message: "Unauthorized" });
    }

    if (
      !user.refreshTokenExpiresAt ||
      user.refreshTokenExpiresAt.getTime() < Date.now()
    ) {
      return next({ statusCode: 401, message: "Refresh token expired" });
    }

    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    res.json({ accessToken });
  } catch (error) {
    return next({ statusCode: 500, message: error.message });
  }
};
