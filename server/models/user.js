import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  password: {
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
  totolSpends: {
    type: Number,
  },
  totalOrders: {
    type: Number,
  },
  loyalPoints: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
  referenceToken: {
    type: String,
  },
  referenceTokenExpiresTime: {
    type: Date,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
