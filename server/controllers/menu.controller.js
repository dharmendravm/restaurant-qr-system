import Menu from "../models/menu.js";

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
