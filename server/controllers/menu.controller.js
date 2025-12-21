import cloudinary from "../config/cloudinary.js";
import Menu from "../models/menu.js";

export const createMenu = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("Image is required");
      error.statusCode = 400;
      throw error;
    }

    const filePath = req.file.path;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "menu",
    });

    // Save to DB
    const menuItem = await Menu.create({
      ...req.body,
      image: result.secure_url,
    });

    return res.status(201).json({
      success: true,
      data: menuItem,
      message: "New menu item added",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMenuItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    console.log(req.query);
    console.log(category);

    //  const filter  = category ? {category , isAvailable : true} : {isAvailable : true}
    //   console.log(filter)
    let filter = { isAvailable: true };

    if (category && category.trim() !== "") {
      filter.category = category.trim();
    }

    const menuItems = await Menu.find(filter);

    return res.status(200).json({
      success: true,
      total: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};
