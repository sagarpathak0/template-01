// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); // Import multer middleware
const {
  createProject,
  deleteProjectById,
  getAllProjectsByCurrentUser,
  getPublicProjectsByUserId,
  updateProject,
  removeAttachment,
  updateAttachments,
} = require('../controller/project.js');

const authenticateToken = require("../middleware/authenticateToken.js")

// Create a new project
router.post('/create', upload.array('files'), createProject);

// Delete a project by ID
router.delete('/delete/:projectId', deleteProjectById);

// Get all projects by the current user
router.get('/my-projects', getAllProjectsByCurrentUser);

// Get all public projects by user ID
router.get('/public/:userId', getPublicProjectsByUserId);

// Update a project by ID
router.put('/update/:projectId', updateProject);

router.post("/projects/:projectId/update-attachments", upload.array('files'), updateAttachments);

router.delete("/:projectId/attachments", removeAttachment);

module.exports = router;
