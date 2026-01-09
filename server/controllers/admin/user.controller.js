import User from "../../models/user.js";

//get all users
export const getTotalUsers = async (_req, res, next) => {
  try {
    const users = await User.find().select(
      "-password -refreshToken -resetPasswordToken -resetPasswordExpires -referenceTokenExpiresTime"
    );

    return res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};
