import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const NOTES_FILE = path.join(DATA_DIR, 'notes.txt');

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