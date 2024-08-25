// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // Import multer middleware
const {
  createProject,
  deleteProjectById,
  getAllProjectsByCurrentUser,
  getPublicProjectsByUserId,
  updateProject,
  removeAttachment,
  updateAttachments,
  uploadAttachments,
  uploadThumbnail,
  getCollaboratedProjects,
} = require("../controller/project.js");

const authenticateToken = require("../middleware/authenticateToken.js");

// Create a new project
router.post("/", authenticateToken, upload.single("file"), createProject);

// Delete a project by ID
router.delete("/delete/:projectId", authenticateToken, deleteProjectById);

// Get all projects by the current user
router.get("/my-projects", authenticateToken, getAllProjectsByCurrentUser);

// Get all public projects by user ID
router.get("/public/:userId", authenticateToken, getPublicProjectsByUserId);

// Update a project by ID
router.put("/update/:projectId", authenticateToken, updateProject);

router.post(
  "/:projectId/update-attachments",
  authenticateToken,
  upload.array("files"),
  updateAttachments
);

router.delete("/:projectId/attachments", authenticateToken, removeAttachment);
router.post(
  "/:projectId/attachments",
  authenticateToken,
  upload.array("files"),
  uploadAttachments
);
router.post("/:projectId/upload-thumbnail",authenticateToken, upload.single("thumbnail"), uploadThumbnail);

router.get('/collaborated', authenticateToken, getCollaboratedProjects);

module.exports = router;
