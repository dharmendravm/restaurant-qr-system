import { FRONTEND_URL, MAIL_USER } from "../config.js";
import User from "../models/user.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import resetPasswordTemplate from "../services/emailtemplates/resetPasswordTemplate.js";
import transporter from "../services/emailService.js";

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const err = new Error("Email is required");
      err.statusCode = 400;
      throw err;
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If the email exists, a reset link has been sent",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: MAIL_USER,
      to: user.email,
      subject: "Reset Your Password",
      html: resetPasswordTemplate({
        userName: user.name,
        appName: "TableOrbit",
        resetLink: resetLink,
      }),
    });
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!token || !password) {
      const error = new Error("Token and password are required");
      error.statusCode = 400;
      throw error;
    }

    if (password !== confirmPassword) {
      const err = new Error("Passwords do not match");
      err.statusCode = 400;
      throw err;
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      const err = new Error("Invalid or expired reset token");
      err.statusCode = 400;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful. Please login again.",
    });
  } catch (error) {
    next(error);
  }
};
