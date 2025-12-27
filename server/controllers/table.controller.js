import Table from "../models/table.js";

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
      error.statusCode = 404;
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