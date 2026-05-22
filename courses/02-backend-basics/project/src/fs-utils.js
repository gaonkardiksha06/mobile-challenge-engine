import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NOTES_PATH = path.join(__dirname, '..', 'data', 'notes.json');

export async function readNotesFile() {
  try {
    const raw = await fs.readFile(NOTES_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeNotesFile(notes) {
  await fs.mkdir(path.dirname(NOTES_PATH), { recursive: true });
  await fs.writeFile(NOTES_PATH, JSON.stringify(notes, null, 2), 'utf-8');
}
