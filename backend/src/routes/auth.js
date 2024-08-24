const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const admin = require("firebase-admin");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/signup", async (req, res) => {
  const { username, email, password, name, gender } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "AAM JAHE MUNDE" });
    }
    user = new User({
      username,
      email,
      password,
      gender,
      name,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    console.log("JWT Token generated:", token);
    res
      .status(201)
      .json({ token, user: { ...user._doc, password: undefined } });
  } catch (err) {
    console.log("Error during signup", err);
    res.status(500).send("AAM NHI HAI MUNDE");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login Request Body:", req.body);

    if (!email || !password) {
      console.log("Validation Error: Missing Fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Authentication Error: User not Found");
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    console.log("Login Successful", token);

    res
      .status(200)
      .json({ token, user: { ...user._doc, password: undefined } });
  } catch (err) {
    console.log("Error during Login", err.message, err.stack);
    res.status(500).json({ message: "Login Error" });
  }
});

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    // Validate token
    if (!token) {
      console.log("Validation Error: Missing Token");
      return res.status(400).json({ message: "Missing token" });
    }

    // Verify token
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      console.log("Authentication Error: Invalid Token");
      return res.status(401).json({ message: "Invalid token" });
    }

    const { uid, email, name, picture } = decodedToken;

    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { uid }] });

    if (user) {
      // If user exists, generate a new JWT token
      const newToken = jwt.sign(
        { userId: user._id },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "1h",
        }
      );

      // Assuming you want to store the JWT token as a password (which might be unconventional)
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(newToken, salt); // Save hashed token as password
      await user.save();

      console.log("Google Login Successful", newToken);
      res
        .status(200)
        .json({ token: newToken, user: { ...user._doc, password: undefined } });
    } else {
      // Create a new user if none exists
      const newUser = new User({ uid, email, name, profilePic: picture });

      // Save the new user first to get the _id
      await newUser.save();

      // Generate a new JWT token
      const newToken = jwt.sign(
        { userId: newUser._id },
        process.env.SECRET_TOKEN,
        { expiresIn: "1h" }
      );

      // Hash the token and save it as the password
      const salt = await bcrypt.genSalt(12);
      newUser.password = await bcrypt.hash(newToken, salt);
      await newUser.save();

      console.log("Google Login Successful", newToken);
      res.status(200).json({
        token: newToken,
        user: { ...newUser._doc, password: undefined },
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error during Google Login" });
  }
});

router.post("/github", async (req, res) => {
  try {
    const { token } = req.body;

    // Validate token
    if (!token) {
      console.log("Validation Error: Missing Token");
      return res.status(400).json({ message: "Missing token" });
    }

    // Verify token
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      console.log("Authentication Error: Invalid Token");
      return res.status(401).json({ message: "Invalid token" });
    }

    const { uid, email, name } = decodedToken;

    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { uid }] });

    if (user) {
      // If user exists, generate a new JWT token
      const newToken = jwt.sign(
        { userId: user._id },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "1h",
        }
      );

      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(newToken, salt);
      await user.save();

      console.log("GitHub Login Successful", newToken);
      res
        .status(200)
        .json({ token: newToken, user: { ...user._doc, password: undefined } });
    } else {
      // Create a new user if none exists
      const newUser = new User({ uid, email, username: name });

      // Save the new user first to get the _id
      await newUser.save();

      // Generate a new JWT token
      const newToken = jwt.sign(
        { userId: newUser._id },
        process.env.SECRET_TOKEN,
        { expiresIn: "1h" }
      );

      // Hash the token and save it as the password
      const salt = await bcrypt.genSalt(12);
      newUser.password = await bcrypt.hash(newToken, salt);
      await newUser.save();

      console.log("GitHub Login Successful", newToken);
      res.status(200).json({
        token: newToken,
        user: { ...newUser._doc, password: undefined },
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error during GitHub Login" });
  }
});

// router.get('/verify', authenticateToken, async(req, res) => {
//   res.json({ user: req.user });
// });

router.route("/verify").get([authenticateToken], async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Error during verification",
    });
  }
});

module.exports = router;
