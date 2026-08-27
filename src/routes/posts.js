// src/routes/posts.js
import express from "express";
import mongoose from "mongoose";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Post model
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Post = mongoose.model("Post", PostSchema);

// Create post
router.post("/", requireAuth, async (req, res) => {
  const post = new Post({ ...req.body, author: req.user.id });
  await post.save();
  res.status(201).json(post);
});

// Get all posts
router.get("/", async (_, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Get single post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// Update post
router.put("/:id", requireAuth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ error: "Not your post" });
  }
  Object.assign(post, req.body);
  await post.save();
  res.json(post);
});

// Delete post
router.delete("/:id", requireAuth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ error: "Not your post" });
  }
  await post.deleteOne();
  res.json({ message: "Post deleted" });
});

export default router;