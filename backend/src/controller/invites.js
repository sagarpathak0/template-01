const Invitation = require("../models/invitation");
const Project = require("../models/projects");
const User = require("../models/user");
const { generateInvitationHtml } = require("../utils/emails");
const { sendEmail } = require("../utils/sendEmail");

exports.createInvitation = async (req, res) => {
  try {
    const { projectId, invitedUserEmail } = req.body;
    const inviterId = req.user._id;

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Check if invited user exists
    const invitedUser = await User.findOne({ email: invitedUserEmail });
    if (!invitedUser) {
      return res.status(404).json({ message: "Invited user not found." });
    }

    // Check if an invitation already exists
    const existingInvitation = await Invitation.findOne({
      project: projectId,
      invitedUser: invitedUser._id,
      status: "Pending",
    });

    if (existingInvitation) {
      return res.status(400).json({ message: "Invitation already sent." });
    }

    // Create a new invitation
    const newInvitation = new Invitation({
      project: projectId,
      invitedUser: invitedUser._id,
      inviter: inviterId,
    });

    // Save the invitation
    await newInvitation.save();

    // Generate invitation email content
    const invitationDate = newInvitation.sentAt.toDateString();
    const htmlContent = generateInvitationHtml(
      project.title,
      req.user.name,
      invitationDate
    );

    // Send the invitation email
    await sendEmail({
      to: invitedUserEmail,
      subject: `You're Invited to Collaborate on ${project.title}`,
      html: htmlContent,
    });

    res.status(201).json({
      message: "Invitation sent successfully.",
      invitation: newInvitation,
    });
  } catch (error) {
    console.error("Error sending invitation:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to send invitation." });
  }
};

exports.acceptInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const userId = req.user._id;

    // Find the invitation
    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found." });
    }

    // Check if the invitation is already accepted or rejected
    if (invitation.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Invitation already responded to." });
    }

    // Update the invitation status
    invitation.status = "Accepted";
    invitation.respondedAt = new Date();
    await invitation.save();

    // Add the user as a collaborator on the project
    const project = await Project.findById(invitation.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (project.collaborators.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is already a collaborator." });
    }

    project.collaborators.push(userId);
    await project.save();

    res
      .status(200)
      .json({
        message: "Invitation accepted and user added as a collaborator.",
      });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to accept invitation." });
  }
};

exports.rejectInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const userId = req.user._id;

    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found." });
    }

    if (invitation.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Invitation already responded to." });
    }

    invitation.status = "Rejected";
    invitation.respondedAt = new Date();
    await invitation.save();

    res.status(200).json({ message: "Invitation rejected." });
  } catch (error) {
    console.error("Error rejecting invitation:", error);
    res
      .status(500)
      .json({ message: "Server Error. Unable to reject invitation." });
  }
};
