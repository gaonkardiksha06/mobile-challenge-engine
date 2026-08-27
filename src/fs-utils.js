import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR, ensureDataDir } from "./utils/data-dir.js";

const NOTES_FILE = path.join(DATA_DIR, "notes.txt");
const NOTES_JSON_FILE = path.join(DATA_DIR, "notes.json");

/** Reads notes from the plain text file. */
export async function readNotes() {
  await ensureDataDir();
  try {
    return await readFile(NOTES_FILE, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return "";
    }
    throw error;
  }
}

/** Writes notes to the plain text file. */
export async function writeNotes(content) {
  await ensureDataDir();
  await writeFile(NOTES_FILE, content, "utf8");
}

/** Appends a line to the notes file. */
export async function appendNote(line) {
  const existing = await readNotes();
  const updated = existing.length > 0 ? `${existing}${line}\n` : `${line}\n`;
  await writeNotes(updated);
}

/** Reads notes as a JSON array of note objects. */
export async function readNotesFile() {
  await ensureDataDir();
  try {
    const raw = await readFile(NOTES_JSON_FILE, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

/** Writes an array of note objects as JSON. */
export async function writeNotesFile(notes) {
  await ensureDataDir();
  await writeFile(NOTES_JSON_FILE, JSON.stringify(notes, null, 2), "utf8");
}
