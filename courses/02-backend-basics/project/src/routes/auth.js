
// src/routes/auth.js

import express from "express";
import bcrypt from "bcryptjs";
import { requireAuth, signToken } from "../middleware/auth.js";
import { User } from "../models/User.js";

const router = express.Router();

// Test cleanup route
router.delete("/test-cleanup", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        error: "Email query parameter required",
      });
    }

    await User.deleteOne({ email });

    res.json({
      message: `Test user ${email} cleared`,
    });
  } catch {
    res.status(500).json({
      error: "Cleanup failed",
    });
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Username, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    });
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = signToken({
      id: user._id.toString(),
      email: user.email,
    });

    res.json({
      token,
    });
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Protected profile route
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id,
      { password: 0 }
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    });
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;

