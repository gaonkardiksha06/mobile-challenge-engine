// src/routes/notes.js

import express from "express";

const router = express.Router();

// In-memory notes store
let notes = [];

// GET /api/notes
router.get("/", (_req, res) => {
  res.json(notes);
});

// POST /api/notes
router.post("/", (req, res) => {
  const { title, body } = req.body;

  if (!title) {
    return res.status(400).json({
      error: '"title" is required',
    });
  }

  const note = {
    id: Date.now().toString(),
    title,
    body,
  };

  notes.push(note);

  return res.status(201).json(note);
});

// DELETE /api/notes/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Note not found",
    });
  }

  notes.splice(index, 1);

  return res.status(200).json({
    message: "Note deleted",
  });
});

export default router;