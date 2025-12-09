import crypto from "crypto";
import QRCode from "qrcode";
import Table from "../models/table.js";

  //  REGISTER TABLE
  
export const registerTable = async (req, res, next) => {
  try {
    const { tableNumber, capacity } = req.body;

    if (!tableNumber || !capacity) {
      const error = new Error("Table number and capacity are required");
      error.status = 400;
      throw error;
    }

    // Generate unique QR slug
    const qrSlug = crypto.randomBytes(6).toString("hex");

    // Generate QR scan URL
    const qrCodeURL = `http://localhost:5173/welcome?qr=${qrSlug}`;

    // Generate QR image (base64)
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


// GET TABLE BY SLUG

export const getTableBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const table = await Table.findOne({
      qrSlug: slug,
      isActive: true,
    });

    if (!table) {
      const error = new Error("No table found with this slug");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: table,
    });

  } catch (error) {
    next(error);
  }
};


  //  GET ALL TABLES

export const getAllTables = async (req, res, next) => {
  try {
    const tables = await Table.find();

    if (!tables.length) {
      const error = new Error("No tables found");
      error.status = 404;
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
