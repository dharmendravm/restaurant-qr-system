import crypto from "crypto";
import QRCode from "qrcode";
import os from "os";
import Table from "../../models/table.js";

//  REGISTER TABLE
export const registerTable = async (req, res, next) => {
  try {
    const { tableNumber, capacity } = req.body;

    if (!tableNumber || !capacity) {
      const error = new Error("Table number and capacity are required");
      error.statusCode = 400;
      throw error;
    }

    // Generate unique QR slug
    const qrSlug = crypto.randomBytes(6).toString("hex");
    // Generate QR scan URL based on local network IP if available
    const nets = os.networkInterfaces();
    let ipAddress = "localhost";

    for (const name of Object.keys(nets)) {
      for (const iface of nets[name] || []) {
        if (iface.family === "IPv4" && !iface.internal) {
          ipAddress = iface.address;
          break;
        }
      }
      if (ipAddress !== "localhost") break;
    }

    const qrCodeURL = `http://${ipAddress}:5173/welcome?qr=${qrSlug}`;
    const qrImage = await QRCode.toDataURL(qrCodeURL);

    // Save in DB
    const table = await Table.create({
      tableNumber,
      capacity,
      qrImage,
      qrCodeURL,
      qrSlug,
    });

    res.status(201).json({
      success: true,
      message: "Table registered successfully",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};


export const getAllTables = async (_req, res, next) => {
  try {
    const tables = await Table.find();

    if (!tables.length) {
      const error = new Error("No tables found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      count: tables.length,
      data: tables,
    });
  } catch (error) {
    next(error);
  }
};
