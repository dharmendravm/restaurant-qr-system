import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

// Register new user
export const register = async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  try {
    if (!name || !email || !phone || !password) {
      throw { statusCode: 400, message: "Missing filds" };
    }

    // Check if User is Existing
    const existing = await User.findOne({ email });
    if (existing) {
      throw { statusCode: 400, message: "Account already axists" };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const data = { name, email, phone, password: passwordHash };

    const newUser = await User.create(data);
    res.status(201).json({
      success: true,
      data: newUser,
      message: "Account created sucsessfully",
    });
  } catch (error) {
    next(error);
  }
};

// User Login
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      throw { statusCode : 400 ,message: "Invalid email or password" };

    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {     
      throw {statusCode : 400, message: "Invalid email or password" };
    }

    // Tokens
    const accessToken = generateAccessToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    const refreshToken = generateRefreshToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    user.refreshToken = refreshToken;
    user.refreshTokenExpiresTime = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );
    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error)
  }
};
