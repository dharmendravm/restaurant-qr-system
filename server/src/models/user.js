import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  phone: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    select: false,
  },
  avatar: {
    type: String,
  },
  authProvider: {
    type: String,
    enum: ["LOCAL", "GOOGLE", "GITHUB"],
    default: "LOCAL",
  },
  uid: {
    type: String,
  },
  accountType: {
    type: String,
    enum: ["REGISTERED", "GUEST"],
    default: "REGISTERED",
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  totalSpends: {
    type: Number,
    default: 0,
  },
  loyalPoints: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  refreshToken: {
    type: String,
  },
  refreshTokenExpiresAt: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  lastLogin: {
    type: Date,
    default: Date,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
