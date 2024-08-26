const Project = require("../models/projects.js");
const User = require("../models/user.js");
const uploadToCloudinary = require("../utils/uploadToCloudinary.js");
const deleteFromCloudinary = require("../utils/deleteFromCloduinary.js");

exports.createProject = async (req, res) => {
  try {
    const { title, description, visible, tags } = req.body;
    const userId = req.user._id;

    const attachments = [];
    let videoUrl = "";

    const files = req.files || [];
    if (files.length > 0) {
      for (let file of files) {
        const result = await uploadToCloudinary(file.path, userId);

        if (result) {
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
    } else {
      console.log("No files provided");
    }

    // Create the new project
    const newProject = new Project({
      title,
      description,
      createdBy: userId,
      video: videoUrl,
      thumbnail: attachments[0]?.url,
      visible: visible || "Private",
      tags: tags || [],
    });

    // Save the project
    const savedProject = await newProject.save();

    const createdProject = await Project.findById(savedProject._id)
      .populate("collabrates")
      .populate("createdBy");

    // Update the user's projectsId
    await User.findByIdAndUpdate(userId, {
      $push: { projectsId: savedProject._id },
    });

    res.status(201).json({ project: createdProject });
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

    // Validate if the project exists and is created by the current user
    const project = await Project.findOne({
      _id: projectId,
      createdBy: userId,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const attachments = [];
    let videoUrl = "";

    // Handle file uploads
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.path, userId);
      if (result) {
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

    // Update the project with new attachments
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, createdBy: userId },
      {
        $push: {
          attachments: { $each: attachments },
        },
        video: videoUrl || project.video, // Preserve existing video URL if no new video is uploaded
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

exports.uploadAttachments = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    // Validate if the project exists and is created by the current user
    const project = await Project.findOne({
      _id: projectId,
      createdBy: userId,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Handle file uploads
    const attachments = [];
    let videoUrl = "";
    let thumbnailUrl = "";

    console.log(req.files);
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.path, userId);

      if (result) {
        // Check if the file is a video
        if (file.mimetype.startsWith("video/")) {
          videoUrl = result.secure_url;
        }
        // Check if the file is a thumbnail
        else if (file.fieldname === "thumbnail") {
          thumbnailUrl = result.secure_url;
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

    // Update the project with new attachments, video, and thumbnail
    const updateFields = {
      $push: {
        attachments: { $each: attachments },
      },
      $set: {
        video: videoUrl ? videoUrl : undefined,
        thumbnail: thumbnailUrl ? thumbnailUrl : undefined,
      },
    };

    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, createdBy: userId },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ project: updatedProject });
  } catch (error) {
    console.error("Error uploading attachments:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to upload attachments." });
  }
};

exports.uploadThumbnail = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    // Validate if the project exists and is created by the current user
    const project = await Project.findOne({
      _id: projectId,
      createdBy: userId,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Handle thumbnail upload
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const result = await uploadToCloudinary(req.file.path, userId);

    if (result) {
      // Update the project with the new thumbnail URL
      const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId, createdBy: userId },
        { $set: { thumbnail: result.secure_url } },
        { new: true, runValidators: true }
      );

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found." });
      }

      res.status(200).json({ project: updatedProject });
    } else {
      throw new Error("Failed to upload thumbnail to Cloudinary");
    }
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to upload thumbnail." });
  }
};
exports.getCollaboratedProjects = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware that adds user info to req

    // Find all projects where the user is listed as a collaborator
    const projects = await Project.find({
      collaborators: userId,
      owner: { $ne: userId }, // Exclude projects where the user is the owner
    });

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching collaborated projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Controller to fetch all projects with visibility set to "Public"
exports.allProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      visible: "Public",
    })
      .populate("createdBy")

    if (!projects.length) {
      return res.status(404).json({ message: 'No public projects found.' });
    }

    console.log('Fetched projects:', projects);

    return res.status(200).json({
      projects,
    });
  } catch (err) {
    console.error('Error fetching all projects:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

