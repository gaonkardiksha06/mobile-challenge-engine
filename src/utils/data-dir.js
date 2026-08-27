import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = path.join(__dirname, "..", "data");

/**
 * Ensures the data directory exists.
 * @returns {Promise<void>}
 */
export async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}
