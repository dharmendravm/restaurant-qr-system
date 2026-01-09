// middlewares/requireUserOrGuestSession.js
import Session from "../models/session.js";
import AppError from "../utils/appError.js";

const requireUserOrGuestSession = async (req, _res, next) => {
  try {
    if (req.user) {
      return next();
    }

    const sessionToken = req.headers["x-session-token"];

    if (!sessionToken) {
      return next(new AppError("Unauthorized", 401));
    }

    const session = await Session.findOne({ sessionToken });

    if (!session) {
      return next(new AppError("Invalid session token", 401));
    }

    if (session.expiresAt < Date.now()) {
      return next(new AppError("Session token expired", 401));
    }

    req.session = session;

    next();
  } catch (error) {
    next(error);
  }
};

export default requireUserOrGuestSession;
