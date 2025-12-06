import crypto from "crypto";
import QRCode from "qrcode";
import Table from "../models/table.js";

export const registerTable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    // Generate qr slug
    const qrSlug = crypto.randomBytes(6).toString("hex");

    // Generate qr scan URL
    const qrCodeURL = `http://localhost:5173/welcome?qr=${qrSlug}`;

    // Generate qr image
    QRCode.toDataURL(qrCodeURL, async (err, url) => {
      logController(`from table-controller : ${url}`);
      const qrImage = url;
      const table = new Table({
        tableNumber,
        capacity,
        qrImage,
        qrCodeURL,
        qrSlug,
      });
      // save
      await table.save();

      res.status(201).json({
        success: true,
        data: table,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get table by slug ;
export const getTableBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    console.log(typeof slug);
    const filterObject = { qrSlug: slug, isActive: true };
    console.log(filterObject);

    const table = await Table.findOne({ qrSlug: slug, isActive: true });
    console.log(table);
    if (!table) {
      const error = new Error("No Table found with this slug");
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
// admin verfiyToken ,checkRole(['admin'])
export const getAllTables = async (req, res, next) => {
  try {
    const tables = await Table.find();
    if (tables.length <= 0) {
      const error = new Error("No tables found");
      error.status = 404;
      throw error;
    }
    successResponse(res, 200, tables);
  } catch (error) {
    next(error);
  }
};
