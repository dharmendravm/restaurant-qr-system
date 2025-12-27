import Session from "../models/session.js";
import AppError from "../utils/appError.js";

const sessionTokenVerify = async (req, _res, next) => {
  try {
    const { sessionToken } = req.body;

    const session = await Session.findOne({ sessionToken });

    if (!session) {
        return next(new AppError("Session token missing", 400));
    }

    const currentTime = Date.now();
    if (session.expiresAt < currentTime) {
      const error = new Error("session token is expired");
      throw error;
    }

    req.session = session;
  } catch (error) {
    next(error);
  }
};

export default sessionTokenVerify;
