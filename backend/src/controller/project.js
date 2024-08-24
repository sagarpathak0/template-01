const Project = require("../models/Project.js");
const User = require("../models/user.js");
const uploadToCloudinary = require("../utils/uploadToCloudinary.js");

exports.createProject = async (req, res) => {
  try {
    const { title, description, visible } = req.body;
    const userId = req.user._id;

    const attachments = [];
    let videoUrl = "";

    for (let file of req.files) {
      const result = await uploadToCloudinary(file.path, userId);

      if (result) {
        // Check if the file is a video
        if (file.mimetype.startsWith("video/")) {
          videoUrl = result.secure_url;
        } else {
          attachments.push({
            type: file.mimetype,
            size: file.size,
            url: result.secure_url,
          });
        }
      } else {
        throw new Error("Failed to upload file to Cloudinary");
      }
    }

    // Create the new project
    const newProject = new Project({
      title,
      description,
      attachments,
      createdBy: userId,
      video: videoUrl,
      thumbnail: attachments[0]?.url,
      visible: visible || "Private", // Default to "Private" if not specified
    });

    // Save the project
    const savedProject = await newProject.save();

    // Update the user's projectsId
    await User.findByIdAndUpdate(userId, {
      $push: { projectsId: savedProject._id },
    });

    res.status(201).json({ project: savedProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to create project." });
  }
};
