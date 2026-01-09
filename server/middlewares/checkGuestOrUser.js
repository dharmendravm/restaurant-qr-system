import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config.js";
import User from "../models/user.js";

const checkGuestOrUser = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch {
      return next();
    }

    const user = await User.findById(decoded.id).select(
      "-password -refreshToken"
    );

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export default checkGuestOrUser;
