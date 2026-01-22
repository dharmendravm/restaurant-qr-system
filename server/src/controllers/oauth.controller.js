import { googleAuthServiece } from "../services/auth/google.service.js";
import { githubAuthService } from "../services/auth/github.service.js";

export const googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    const { user, accessToken, refreshToken } =
      await googleAuthServiece(idToken);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const githubLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    const { user, accessToken, refreshToken } =
      await githubAuthService(idToken);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
