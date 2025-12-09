import User from "../models/user.js";

//get all users Admin
export const getTotalUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    console.log(users); //!!!!!!!!!!!

    return res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// Get profile by token
export const getUserByToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "User now updated",
    });
  } catch (error) {
    next(error);
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    const updatedData = {
      name,
      role,
    };

    if (email) {
      updatedData.email = email.toLowerCase();
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true  /*runValidators: true*/ }
    ).select("-password -refreshToken");

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
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

// Deactivate user
export const deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).select("-password -refreshToken");

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
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
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "User deleted permanently",
    });
  } catch (error) {
    next(error);
  }
};
