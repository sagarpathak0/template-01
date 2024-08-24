const transporter = require("../config/nodemailer.js");

exports.sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"Xcali Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
