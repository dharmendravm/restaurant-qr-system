import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import transporter from "../services/emailService.js";
import registerTemplate from "../services/emailtemplates/registerTemplate.js";
import { MAIL_USER } from "../config.js";

// Register new user
export const register = async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  try {
    if (!name || !email || !phone || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase();

    // Check if User is Existing
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      const error = new Error("Account already exists");
      error.statusCode = 400;
      throw error;
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
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }
    // Check user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
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
    user.referenceTokenExpiresTime = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );
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