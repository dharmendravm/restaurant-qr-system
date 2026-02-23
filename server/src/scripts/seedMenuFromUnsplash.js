import "dotenv/config";
import axios from "axios";
import ConnectDB from "../config/database.js";
import cloudinary from "../config/cloudinary.js";
import Menu from "../models/menu.js";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const CLOUDINARY_FOLDER = process.env.MENU_CLOUDINARY_FOLDER || "menu/unsplash-seeds";
const ITEMS_PER_CATEGORY = Number(process.env.UNSPLASH_ITEMS_PER_CATEGORY || 4);

const categories = ["Appetizers", "Soups", "Main Courses", "Desserts", "Beverages"];

const categoryQueries = {
  Appetizers: ["appetizer platter", "fried starter", "garlic bread", "bruschetta"],
  Soups: ["tomato soup bowl", "creamy soup", "hot soup"],
  "Main Courses": [
    "pizza on table",
    "pasta plate",
    "grilled chicken meal",
    "steak dinner plate",
    "paneer curry",
  ],
  Desserts: ["cheesecake slice", "chocolate brownie", "dessert plate", "chocolate cake"],
  Beverages: ["fruit mocktail", "iced coffee", "fresh juice glass", "lemon drink"],
};

const keywordDishMap = {
  pizza: "Woodfired Pizza",
  pasta: "Penne Pasta",
  steak: "Grilled Steak Plate",
  burger: "Classic Burger",
  chicken: "Roasted Chicken Bowl",
  beef: "Sizzling Beef Bowl",
  paneer: "Paneer Signature Curry",
  soup: "Chef's Daily Soup",
  cheesecake: "Berry Cheesecake",
  brownie: "Chocolate Brownie",
  cake: "Chocolate Layer Cake",
  coffee: "Iced Coffee",
  mojito: "Citrus Mojito",
  lemonade: "Fresh Lemonade",
  juice: "Fresh Fruit Cooler",
  smoothie: "Fruit Smoothie",
  salad: "Garden Salad Bowl",
};

const fallbackDishByCategory = {
  Appetizers: "Crispy Starter Platter",
  Soups: "Creamy Soup Bowl",
  "Main Courses": "House Special Main Plate",
  Desserts: "Chef's Dessert Special",
  Beverages: "Signature Chilled Beverage",
};

const priceRangeByCategory = {
  Appetizers: [179, 299],
  Soups: [149, 249],
  "Main Courses": [299, 549],
  Desserts: [189, 299],
  Beverages: [129, 239],
};

const adjectivePool = [
  "Signature",
  "Classic",
  "Chef's",
  "Premium",
  "Special",
  "House",
  "Fresh",
  "Deluxe",
];

const hashCode = (value) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const titleCase = (value) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const cleanText = (value = "") => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

const inferDishName = (altDescription, category, photoId) => {
  const clean = cleanText(altDescription);
  const matchedKey = Object.keys(keywordDishMap).find((key) =>
    clean.split(/\s+/).includes(key),
  );
  const baseName = matchedKey
    ? keywordDishMap[matchedKey]
    : fallbackDishByCategory[category];
  const adjective = adjectivePool[hashCode(photoId) % adjectivePool.length];
  return `${adjective} ${baseName}`;
};

const inferDescription = (altDescription, category) => {
  if (altDescription && altDescription.trim()) {
    const text = titleCase(altDescription.trim().replace(/\.$/, ""));
    return `${text}. Prepared fresh and served as a ${category.toLowerCase()} favorite.`;
  }
  return `A fresh ${category.toLowerCase()} item prepared with quality ingredients and balanced flavor.`;
};

const inferPrice = (photoId, category) => {
  const [min, max] = priceRangeByCategory[category];
  const step = 10;
  const bucketCount = Math.floor((max - min) / step);
  const bucket = hashCode(photoId) % (bucketCount + 1);
  return min + bucket * step;
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const makeNameKey = (name, category) =>
  `${(name || "").trim().toLowerCase()}|${(category || "").trim().toLowerCase()}`;

const searchUnsplash = async (query, page = 1, perPage = 20) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
    params: {
      query,
      page,
      per_page: perPage,
      content_filter: "high",
      orientation: "landscape",
    },
    proxy: false,
    timeout: 20000,
  });
  return response.data?.results || [];
};

const buildCategoryPhotoPool = async (category) => {
  const queries = categoryQueries[category] || [];
  const pool = [];
  const seen = new Set();

  for (const query of queries) {
    const photos = await searchUnsplash(query, 1, 15);
    for (const photo of photos) {
      if (!photo?.id || !photo?.urls?.regular) continue;
      if (seen.has(photo.id)) continue;
      seen.add(photo.id);
      pool.push(photo);
    }
  }

  return pool;
};

const uploadUnsplashPhoto = async (photoUrl, publicId) => {
  return cloudinary.uploader.upload(photoUrl, {
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

const validateEnv = () => {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error("UNSPLASH_ACCESS_KEY is missing in environment.");
  }
  if (!Number.isFinite(ITEMS_PER_CATEGORY) || ITEMS_PER_CATEGORY <= 0) {
    throw new Error("UNSPLASH_ITEMS_PER_CATEGORY must be a positive number.");
  }
};

const seedFromUnsplash = async () => {
  validateEnv();
  await ConnectDB();

  const existingUnsplashIds = new Set(
    await Menu.distinct("unsplashId", {
      unsplashId: { $exists: true, $nin: [null, ""] },
    }),
  );

  const existingMenus = await Menu.find({}, { name: 1, category: 1, _id: 0 });
  const existingNameKeys = new Set(
    existingMenus.map((item) => makeNameKey(item.name, item.category)),
  );

  const batchUnsplashIds = new Set();
  const batchNameKeys = new Set();
  const docsToInsert = [];

  for (const category of categories) {
    const photoPool = await buildCategoryPhotoPool(category);
    if (!photoPool.length) {
      console.warn(`No Unsplash photos found for category: ${category}`);
      continue;
    }

    let addedInCategory = 0;
    for (const photo of photoPool) {
      if (addedInCategory >= ITEMS_PER_CATEGORY) {
        break;
      }

      if (existingUnsplashIds.has(photo.id) || batchUnsplashIds.has(photo.id)) {
        continue;
      }

      const altDescription = (photo.alt_description || "").trim();
      const name = inferDishName(altDescription, category, photo.id);
      const nameKey = makeNameKey(name, category);

      if (existingNameKeys.has(nameKey) || batchNameKeys.has(nameKey)) {
        continue;
      }

      const description = inferDescription(altDescription, category);
      const price = inferPrice(photo.id, category);
      const publicId = `${slugify(name)}-${photo.id}`;

      const uploadResult = await uploadUnsplashPhoto(photo.urls.regular, publicId);

      docsToInsert.push({
        name,
        description,
        price,
        category,
        isAvailable: true,
        image: uploadResult.secure_url,
        unsplashId: photo.id,
      });

      batchUnsplashIds.add(photo.id);
      batchNameKeys.add(nameKey);
      addedInCategory += 1;

      console.log(`Added ${name} (${category}) from Unsplash photo ${photo.id}`);
    }

    if (addedInCategory < ITEMS_PER_CATEGORY) {
      console.warn(
        `Category ${category}: requested ${ITEMS_PER_CATEGORY}, added ${addedInCategory} unique items.`,
      );
    }
  }

  if (!docsToInsert.length) {
    console.log("No items generated from Unsplash.");
    return;
  }

  const inserted = await Menu.insertMany(docsToInsert, { ordered: false });
  console.log(`Unsplash seeding complete. Inserted: ${inserted.length}`);
};

seedFromUnsplash()
  .then(() => {
    console.log("Seeding finished successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Unsplash menu seeding failed:", error.message);
    process.exit(1);
  });
