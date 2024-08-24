const cloud = require("../config/cloudinary.js")

const deleteFromCloudinary = async (publicId) => {
    try {
      await cloud.uploader.destroy(publicId);
    } catch (error) {
      console.error("Error deleting file from Cloudinary:", error);
      throw new Error("Failed to delete file from Cloudinary");
    }
  };

  module.exports = deleteFromCloudinary