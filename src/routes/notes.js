import express from "express";
import { logger } from "../logger.js";

const router = express.Router();
let notes = []; // in-memory store

// GET /api/notes
router.get("/", (_req, res) => {
  res.json(notes);
});

// POST /api/notes
router.post("/", (req, res) => {
  const { title, body } = req.body;
  if (!title) {
    return res.status(400).json({ error: '"title" is required' });
  }
  const note = { id: Date.now().toString(), title, body };
  notes.push(note);
  logger.info("Note created");
  res.status(201).json(note);
});

// DELETE /api/notes/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }
  notes.splice(index, 1);
  logger.info("Note deleted");
  res.status(200).json({ message: "Note deleted" });
});

export default router;
