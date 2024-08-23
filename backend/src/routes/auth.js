const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const admin = require("firebase-admin");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "AAM JAHE MUNDE" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    console.log("JWT Token generated:", token);
    res.status(201).json({ token });
  } catch (err) {
    console.log("Error during signup", err.message);
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

    res.status(200).json({ token });
  } catch (err) {
    console.log("Error during Login", err.message, err.stack);
    res.status(500).json({ message: "Login Error" });
  }
});

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      console.log("Validation Error: Missing Fields");
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) {
      console.log("Authentication Error: Invalid Token");
    }
    const { uid, email, name, picture } = decodedToken;
    let user = await User.findOne({ $or: [{ email }, { uid }] });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
        expiresIn: "1h",
      });
      user.password = await bcrypt.hash(token, 12);
      await user.save();
      console.log("Google Login Successful", token);
      res.status(200).json({ token });
    } else {
      const newUser = new User({ uid, email, name });
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "1h",
        }
      );
      user.password = await bcrypt.hash(token, 12);
      await newUser.save();

      console.log("Google Login Successful", token);
      res.status(200).json({ token });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Error during Google Login",
    });
  }
});

router.post("/github", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      console.log("Validation Error: Missing Fields");
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) {
      console.log("Authentication Error: Invalid Token");
    }
    const { uid, email, name, picture } = decodedToken;
    let user = await User.findOne({ $or: [{ email }, { uid }] });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
        expiresIn: "1h",
      });
      user.password = await bcrypt.hash(token, 12);
      await user.save();
      console.log("Github Login Successful", token);
      res.status(200).json({ token });
    } else {
      const newUser = new User({ uid, email, name });
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "1h",
        }
      );
      user.password = await bcrypt.hash(token, 12);
      await newUser.save();
      console.log("Github Login Successful", token);
      res.status(200).json({ token });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Error during GitHub Login",
    });
  }
});

router.get('/verify', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
