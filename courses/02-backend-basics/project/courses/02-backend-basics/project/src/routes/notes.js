import { Router } from 'express';
import { readNotesFile, writeNotesFile } from '../fs-utils.js';

const router = Router();
let notesCache = null;

async function loadNotes() {
  if (!notesCache) notesCache = await readNotesFile();
  return notesCache;
}

router.get('/', async (_req, res) => {
  const notes = await loadNotes();
  res.json(notes);
});

router.post('/', async (req, res) => {
  const { title, body } = req.body;
  if (!title?.trim()) return res.status(400).json({ error: 'Title is required' });
  const notes = await loadNotes();
  const note = {
    id: String(Date.now()),
    title: title.trim(),
    body: body?.trim() ?? '',
    createdAt: new Date().toISOString(),
  };
  notes.push(note);
  notesCache = notes;
  await writeNotesFile(notes);
  res.status(201).json(note);
});

router.delete('/:id', async (req, res) => {
  const notes = await loadNotes();
  const index = notes.findIndex((n) => n.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Note not found' });
  const [removed] = notes.splice(index, 1);
  notesCache = notes;
  await writeNotesFile(notes);
  res.json(removed);
});

export default router;
