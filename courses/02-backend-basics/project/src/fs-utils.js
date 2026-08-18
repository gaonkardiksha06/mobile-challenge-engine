import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const NOTES_FILE = path.join(DATA_DIR, 'notes.txt');
const NOTES_JSON_FILE = path.join(DATA_DIR, 'notes.json');

/**
 * @returns {Promise<void>}
 */
async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

/**
 * @returns {Promise<string>}
 */
export async function readNotes() {
  await ensureDataDir();
  try {
    return await readFile(NOTES_FILE, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return '';
    }
    throw error;
  }
}

/**
 * @param {string} content
 * @returns {Promise<void>}
 */
export async function writeNotes(content) {
  await ensureDataDir();
  await writeFile(NOTES_FILE, content, 'utf8');
}

/**
 * @param {string} line
 * @returns {Promise<void>}
 */
export async function appendNote(line) {
  const existing = await readNotes();
  const updated = existing.length > 0 ? `${existing}${line}\n` : `${line}\n`;
  await writeNotes(updated);
}

/**
 * Reads notes as a JSON array of note objects.
 * Used by the notes REST API (src/routes/notes.js), which needs
 * structured records (id, title, body, createdAt) rather than raw lines.
 * @returns {Promise<Array<object>>}
 */
export async function readNotesFile() {
  await ensureDataDir();
  try {
    const raw = await readFile(NOTES_JSON_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Writes an array of note objects as JSON.
 * @param {Array<object>} notes
 * @returns {Promise<void>}
 */
export async function writeNotesFile(notes) {
  await ensureDataDir();
  await writeFile(NOTES_JSON_FILE, JSON.stringify(notes, null, 2), 'utf8');
}
