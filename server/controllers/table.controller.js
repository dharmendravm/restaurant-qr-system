import crypto from 'crypto';
import QRCode from 'qrcode';
import Table from '../models/table.js';

export const registerTable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    // Generate qr slug
    const qrSlug = crypto.randomBytes(6).toString('hex');

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