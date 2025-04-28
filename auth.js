// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: "User already exists" });
  
      const user = new User({ username, email, password });
      await user.save();
  
      const token = jwt.sign({ id: user._id }, "secretKey123", { expiresIn: "1h" });
      
      // After signup success, send a response with a message
      res.status(201).json({
        message: "Successfully signed up!",
        token: token,
        user: { username, email }
      });
    } catch (err) {
      res.status(500).json({ message: "Error signing up", error: err });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      // Compare password with hashed password stored in database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // Generate a token if login is successful
      const token = jwt.sign({ id: user._id }, "secretKey123", { expiresIn: "1h" });
      res.status(200).json({
        message: "Login successful!",
        token: token,
        user: { username: user.username, email: user.email }
      });
    } catch (err) {
      res.status(500).json({ message: "Error logging in", error: err });
    }
  });

module.exports = router;
