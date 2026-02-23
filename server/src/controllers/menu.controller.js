import Menu from "../models/menu.js";

export const getAllMenuItems = async (req, res, next) => {
  try {
    const { category, page, limit } = req.query;
    let filter = { isAvailable: true };

    if (category && category.trim() !== "") {
      filter.category = category.trim();
    }

    const hasPagination = page !== undefined || limit !== undefined;
    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const pageLimit = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 100);

    const totalItems = await Menu.countDocuments(filter);

    let menuItems = [];
    if (hasPagination) {
      const skip = (pageNumber - 1) * pageLimit;
      menuItems = await Menu.find(filter).skip(skip).limit(pageLimit);
    } else {
      menuItems = await Menu.find(filter);
    }

    const totalPages = hasPagination ? Math.max(Math.ceil(totalItems / pageLimit), 1) : 1;

    return res.status(200).json({
      success: true,
      total: totalItems,
      count: menuItems.length,
      pagination: {
        enabled: hasPagination,
        currentPage: hasPagination ? pageNumber : 1,
        limit: hasPagination ? pageLimit : totalItems,
        totalPages,
        hasNextPage: hasPagination ? pageNumber < totalPages : false,
        hasPrevPage: hasPagination ? pageNumber > 1 : false,
      },
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};
