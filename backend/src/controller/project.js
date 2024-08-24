const Project = require("../models/Project.js");
const User = require("../models/user.js");
const uploadToCloudinary = require("../utils/uploadToCloudinary.js");
const deleteFromCloudinary = require("../utils/deleteFromCloduinary.js");

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

exports.deleteProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    const deletedProject = await Project.findOneAndDelete({
      _id: projectId,
      createdBy: userId,
    });

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Optionally, remove the project reference from the user's projectsId
    await User.findByIdAndUpdate(userId, {
      $pull: { projectsId: projectId },
    });

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to delete project." });
  }
};

exports.getAllProjectsByCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const userProjects = await Project.find({
      createdBy: userId,
    });

    res.status(200).json({ projects: userProjects });
  } catch (error) {
    console.error("Error fetching user's projects:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to fetch user's projects." });
  }
};

exports.getPublicProjectsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const publicProjects = await Project.find({
      createdBy: userId,
      visible: "Public",
    });

    res.status(200).json({ projects: publicProjects });
  } catch (error) {
    console.error("Error fetching public projects:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to fetch public projects." });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updates = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ project: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to update project." });
  }
};

exports.updateAttachments = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    // Handle file uploads
    const attachments = [];
    let videoUrl = "";

    for (const file of req.files) {
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

    // Find the project and update its attachments
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, createdBy: userId },
      {
        $push: {
          attachments: { $each: attachments },
          video: videoUrl ? videoUrl : undefined,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ project: updatedProject });
  } catch (error) {
    console.error("Error updating attachments:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to update attachments." });
  }
};

exports.removeAttachment = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { attachmentId } = req.body;

    // Find the project and get the attachment
    const project = await Project.findOne({
      _id: projectId,
      createdBy: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const attachment = project.attachments.id(attachmentId);

    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found." });
    }

    // Delete attachment from Cloudinary
    const publicId = attachment.publicId; 
    if (publicId) {
      await deleteFromCloudinary(publicId);
    }

    // Remove attachment from the project
    project.attachments.id(attachmentId).remove();
    await project.save();

    res.status(200).json({ message: "Attachment removed successfully." });
  } catch (error) {
    console.error("Error removing attachment:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to remove attachment." });
  }
};
