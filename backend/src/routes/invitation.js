const express = require('express');
const router = express.Router();
const { createInvitation, acceptInvitation, rejectInvitation } = require('../controller/invites');
const authenticateToken = require('../middleware/authenticateToken'); 

// Route to create an invitation
router.post('/invitations', authenticateToken, createInvitation);

// Route to accept an invitation
router.put('/invitations/:invitationId/accept', authenticateToken, acceptInvitation);

// Route to reject an invitation
router.put('/invitations/:invitationId/reject', authenticateToken, rejectInvitation);

module.exports = router;
