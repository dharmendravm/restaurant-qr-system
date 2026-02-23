import cloudinary from "../../config/cloudinary.js";
import Menu from "../../models/menu.js";
import AppError from "../../utils/appError.js";

export const createMenu = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
      return next(new AppError("Name, price and category are required", 400));
    }

    if (!req.file) {
      return next(new AppError("Image is required", 400));
    }

    const exists = await Menu.findOne({ name });
    if (exists) {
      return next(new AppError("Menu item already exists", 409));
    }

    // Upload file buffer directly to Cloudinary (works in local and serverless).
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "menu",
          resource_type: "image",
          transformation: [
            { width: 1200, height: 1200, crop: "limit" },
            { quality: "auto:good", fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(req.file.buffer);
    });

    if (!uploadResult?.secure_url) {
      return next(new AppError("Image upload failed", 500));
    }

    const menuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "New menu item added successfully",
      data: menuItem,
      menuItem,
    });
  } catch (error) {
    next(error);
  }
};
