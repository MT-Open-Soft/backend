import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8080;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
export const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

