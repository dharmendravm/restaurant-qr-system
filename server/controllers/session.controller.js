import Session from "../models/session.js";
import Table from "../models/table.js";
import crypto from "crypto";

const SESSION_EXPIRY_HOURS = 24;

export const session = async (req, res, next) => {
  try {
    const { deviceId, qrSlug } = req.body;

    if (!deviceId || !qrSlug) {
      const error = new Error("deviceId and qrSlug not found");
      error.statusCode = 400;
      throw error;
    }

    const table = await Table.findOne({ qrSlug });

    if (!table) {
      const error = new Error("No active table found for this QR slug");
      error.statusCode = 404;
      throw error;
    }

    const tableNumber = table.tableNumber;

    const sessionToken = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() +  SESSION_EXPIRY_HOURS);

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
