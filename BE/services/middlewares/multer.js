import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";

config();

cloudinary.config({
  cloud_name: process.env.CM,
  api_key: process.env.AK,
  api_secret: process.env.AS,
});

export const avatarmulter = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: { folder: "avatar" },
  }),
});
