import { v2 as cloudinary } from "cloudinary";
require("dotenv").config()

  const cloud = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  export default cloud