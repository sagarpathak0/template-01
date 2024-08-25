const cloudinary = require("../config/cloudinary.js")

const uploadToCloudinary = async (filePath, userId) => {
  try {
    const file = await cloudinary.uploader.upload(filePath, {
      // upload_preset: "Hackathon",
      use_filename: true,
      unique_filename: false,
      folder: `users/${userId}/`,
    });
    return file;
  } catch (error) {
    console.error("Cloudinary Upload Error", error);
  }
};

module.exports= uploadToCloudinary;
