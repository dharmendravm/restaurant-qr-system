import Session from "../models/session.js";
import Table from "../models/table.js";
import crypto from "crypto";
import AppError from "../utils/appError.js";

const SESSION_EXPIRY_HOURS = 24;

export const session = async (req, res, next) => {
  try {
    const { deviceId, qrSlug } = req.body;

    if (!deviceId || !qrSlug) {
      return next(new AppError("deviceId and qrSlug not found", 400));
    }

    const table = await Table.findOne({ qrSlug, isActive: true });

    if (!table) {
      return next(new AppError("No active table found for this QR", 404));
    }

    const tableNumber = table.tableNumber;

    const existingSession = await Session.findOne({
      deviceId,
      tableNumber,
      expiresAt: { $gt: new Date() },
    });

    if (existingSession) {
      return res.status(200).json({
        success: true,
        data: {
          sessionToken: existingSession.sessionToken,
          expiresAt: existingSession.expiresAt,
          tableNumber,
        },
      });
    }

    const sessionToken = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + SESSION_EXPIRY_HOURS);

    const newSession = new Session({
      deviceId,
      tableNumber,
      sessionToken,
      expiresAt,
      lastActivity: new Date(),
    });
    await newSession.save();

    res.status(201).json({
      success: true,
      data: {
        sessionToken,
        expiresAt,
        tableNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};
