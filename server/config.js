import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

export const FRONTEND_URL = process.env.FRONTEND_URL;

export const MAIL_USER = process.env.MAIL_USER;
export const APP_PASSWORD = process.env.APP_PASSWORD;

export const NODE_ENV = process.env.NODE_ENV || "development";