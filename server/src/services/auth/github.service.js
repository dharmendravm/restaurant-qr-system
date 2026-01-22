import admin from "../../firebase/firebaseAdmin.js";
import User from "../../models/user.js";
import AppError from "../../utils/appError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import transporter from "../email/email.service.js";
import registerTemplate from "../email/templates/registerTemplate.js";

export const githubAuthService = async (idToken) => {
  if (!idToken) {
    return next(new AppError("ID token missing", 400));
  }

  const decoded = await admin.auth().verifyIdToken(idToken);
  const email = decoded.email.toLocaleLowerCase();

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: decoded.name,
      email,
      avatar: decoded.picture,
      uid: decoded.uid,
      authProvider: "GITHUB",
      isEmailVerified: decoded.email_verified,
      lastLogin: new Date(decoded.auth_time * 1000),
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Welcome to TableOrbit 🎉 | 30% OFF Inside",
      html: registerTemplate({
        customerName: user.name,
        orderLink: process.env.FRONTEND_URL,
      }),
    });
  } else {
    user.lastLogin = new Date();
    user.avatar = decoded.picture || user.avatar;
    user.uid = decoded.uid;
    user.lastLogin = new Date();

    await user.save();
  }

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};
