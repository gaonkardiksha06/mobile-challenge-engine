// src/routes/posts.js

import express from "express";
import { requireAuth } from "../middleware/auth.js";
import Post from "../models/Post.js";

const router = express.Router();

// Create post
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Get all posts
router.get("/", async (_req, res) => {
  try {
    const posts = await Post.find().populate(
      "author",
      "email"
    );

    res.json(posts);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Update post
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Delete post
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    res.json({
      message: "Post deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;