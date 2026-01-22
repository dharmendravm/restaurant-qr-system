import User from "../models/user.js";
import AppError from "../utils/appError.js";
import { comparePassword, hashPassword } from "../utils/password.js";

// Get profile by token
export const getUserByToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const { name, phone } = req.body;

    const updatedData = {
      name,
      phone,
    };

    // email
    // if (email) {
    //   updatedData.email = email.toLowerCase();
    // }

    const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
      runValidators: true,
    }).select("-password -refreshToken");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (name === user.name || phone === user.phone) {
      return next(new AppError("No changes detected", 200));
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const isMatch = await comparePassword(currentPassword, user.password);

    if (!isMatch) {
      return next(new AppError("Current password incorrect", 400));
    }

    if (currentPassword === newPassword) {
      return next(
        new AppError(
          "New password must be different from your current password",
          404,
        ),
      );
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// Deactivate user
export const deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    ).select("-password -refreshToken");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Account deactivated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "User deleted permanently",
    });
  } catch (error) {
    next(error);
  }
};
