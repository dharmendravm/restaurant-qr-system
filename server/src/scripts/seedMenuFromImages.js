import "dotenv/config";
import path from "path";
import fs from "fs/promises";
import ConnectDB from "../config/database.js";
import cloudinary from "../config/cloudinary.js";
import Menu from "../models/menu.js";

const IMAGE_DIR = process.env.MENU_IMAGES_DIR || "D:\\Images";
const CLOUDINARY_FOLDER = process.env.MENU_CLOUDINARY_FOLDER || "menu/seeds";

const categories = ["Appetizers", "Soups", "Main Courses", "Desserts", "Beverages"];

const seedMenuData = [
  { file: "pexels-asphotography-96974.jpg", name: "Citrus Sunrise Cooler", category: "Beverages", price: 149, description: "A chilled orange-lemon refresher served over ice with fresh citrus slices." },
  { file: "pexels-blankspace-2907301.jpg", name: "Smoky Bacon Burger", category: "Main Courses", price: 349, description: "Grilled burger layered with crispy bacon, melted cheese, and toasted brioche." },
  { file: "pexels-chevanon-1108117.jpg", name: "Cafe Latte", category: "Beverages", price: 159, description: "Fresh espresso with velvety steamed milk and latte art finish." },
  { file: "pexels-isabella-mendes-107313-338713.jpg", name: "Orange Rosemary Spritzer", category: "Beverages", price: 169, description: "Sparkling orange mocktail with citrus notes and a light rosemary aroma." },
  { file: "pexels-layyana-sheridean-1477746-2846337.jpg", name: "Chocolate Brownie Sundae", category: "Desserts", price: 269, description: "Warm brownie topped with chocolate ice cream, nuts, and rich fudge drizzle." },
  { file: "pexels-marta-dzedyshko-1042863-2067396.jpg", name: "Fudgy Chocolate Brownie", category: "Desserts", price: 229, description: "Dense chocolate brownie squares finished with silky melted chocolate." },
  { file: "pexels-muffin-1653877.jpg", name: "Pepperoni Pizza", category: "Main Courses", price: 399, description: "Stone-baked pizza with mozzarella, pepperoni, and a light herb seasoning." },
  { file: "pexels-paggiarofrancesco-1117862.jpg", name: "Crispy Fried Chicken Bites", category: "Appetizers", price: 279, description: "Crunchy golden chicken bites served hot with a house dipping sauce." },
  { file: "pexels-pixabay-60616.jpg", name: "Butter Garlic Naan Basket", category: "Appetizers", price: 199, description: "A warm basket of mixed naan brushed with garlic butter and herbs." },
  { file: "pexels-roman-odintsov-4552045.jpg", name: "Grilled Veg Quesadilla Platter", category: "Main Courses", price: 319, description: "Crisp folded tortillas with spiced filling, served with dips and sides." },
  { file: "pexels-senuscape-728360-2313686.jpg", name: "Sizzling Beef Stir Fry", category: "Main Courses", price: 459, description: "Tender sliced beef tossed with vegetables, sesame, and a savory glaze." },
  { file: "pexels-timur-weber-8679607.jpg", name: "Kiwi Mint Cooler", category: "Beverages", price: 179, description: "Refreshing kiwi cooler with mint, ice, and a bright fruity finish." },
  { file: "pexels-valeriya-1200348.jpg", name: "Citrus Mojito", category: "Beverages", price: 169, description: "A sparkling citrus blend with mint leaves and crushed ice." },
  { file: "pexels-valeriya-1247670.jpg", name: "Berry Cheesecake Slice", category: "Desserts", price: 249, description: "Creamy cheesecake slice topped with berries and chocolate drizzle." },
  { file: "pexels-valeriya-14107.jpg", name: "Mixed Berry Cream Cake", category: "Desserts", price: 259, description: "Soft layered cream cake garnished with fresh berries and cocoa dusting." },
  { file: "pexels-valeriya-7474372.jpg", name: "Herb Crusted Tenderloin", category: "Main Courses", price: 529, description: "Seared tenderloin served with roasted mushrooms and seasonal vegetables." },
  { file: "pexels-valeriya-827513.jpg", name: "Berry Cheesecake Bars", category: "Desserts", price: 269, description: "Rich cheesecake bars layered with berry compote and fresh berries." },
  { file: "photo-1461023058943-07fcbe16d735.jpg", name: "Iced Cream Coffee", category: "Beverages", price: 189, description: "Cold brew-style coffee over ice swirled with fresh cream." },
  { file: "photo-1547592180-85f173990554.jpg", name: "Grilled Salmon Grain Bowl", category: "Main Courses", price: 489, description: "Flaky grilled salmon with grains, greens, cherry tomatoes, and pesto." },
  { file: "photo-1550547660-d9450f859349.jpg", name: "Classic Beef Burger", category: "Main Courses", price: 339, description: "Juicy beef patty burger with crisp lettuce and toasted seeded buns." },
  { file: "photo-1563805042-7684c019e1cb.jpg", name: "Cookies and Cream Parfait", category: "Desserts", price: 239, description: "Layered cookies and cream dessert with whipped cream and chocolate sauce." },
  { file: "photo-1604382354936-07c5d9983bd3.jpg", name: "Supreme Sausage Pizza", category: "Main Courses", price: 429, description: "Loaded pizza with sausage, mushrooms, olives, peppers, and mozzarella." },
  { file: "photo-1606313564200-e75d5e30476c.jpg", name: "Triple Chocolate Cake", category: "Desserts", price: 249, description: "Moist chocolate cake stacked and finished with glossy chocolate drizzle." },
  { file: "photo-1608198093002-ad4e005484ec.jpg", name: "Artisan Bread Basket", category: "Appetizers", price: 189, description: "A selection of freshly baked artisan breads with crisp crust and soft crumb." },
  { file: "photo-1621996346565-e3dbc646d9a9.jpg", name: "Penne Bolognese", category: "Main Courses", price: 329, description: "Penne pasta in a hearty tomato meat sauce with parmesan and pepper." },
  { file: "photo-1631452180519-c014fe946bc7.jpg", name: "Paneer Butter Masala", category: "Main Courses", price: 349, description: "Cottage cheese cubes in creamy tomato gravy served best with rice or naan." },
];

const isImageFile = (fileName) => /\.(jpg|jpeg|png|webp)$/i.test(fileName);

const validateSeedData = () => {
  for (const item of seedMenuData) {
    if (!item.file || !isImageFile(item.file)) {
      throw new Error(`Invalid or missing image file in seed data for item: ${item.name}`);
    }
    if (!categories.includes(item.category)) {
      throw new Error(`Invalid category in seed data: ${item.category}`);
    }
  }
};

const uploadImageToCloudinary = async (absoluteImagePath, publicId) => {
  return cloudinary.uploader.upload(absoluteImagePath, {
    folder: CLOUDINARY_FOLDER,
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
    transformation: [
      { width: 1200, height: 1200, crop: "limit" },
      { quality: "auto:good", fetch_format: "auto" },
    ],
  });
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const seedMenu = async () => {
  validateSeedData();
  await ConnectDB();

  const operations = [];

  for (const item of seedMenuData) {
    const imagePath = path.join(IMAGE_DIR, item.file);
    const fileExists = await fs
      .access(imagePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      console.warn(`Skipping ${item.name}. File not found: ${imagePath}`);
      continue;
    }

    const publicId = slugify(item.name);

    const uploadResult = await uploadImageToCloudinary(imagePath, publicId);

    operations.push({
      updateOne: {
        filter: { name: item.name },
        update: {
          $set: {
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            isAvailable: true,
            image: uploadResult.secure_url,
          },
        },
        upsert: true,
      },
    });

    console.log(`Uploaded ${item.file} -> ${item.name}`);
  }

  if (!operations.length) {
    console.log("No operations to run.");
    return;
  }

  const result = await Menu.bulkWrite(operations);
  console.log(
    `Menu seed complete. Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`,
  );
};

seedMenu()
  .then(async () => {
    console.log("Seeding finished successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Menu seeding failed:", error.message);
    process.exit(1);
  });
