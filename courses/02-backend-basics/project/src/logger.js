import { appendFile } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR, ensureDataDir } from "./utils/data-dir.js";

const LOG_FILE = path.join(DATA_DIR, "app.log");

/**
 * Formats a log line with timestamp, level, and message.
 * @param {string} level - Log level (INFO, WARN, ERROR)
 * @param {string} message - Log message
 * @returns {string} Formatted log line
 */
function formatLine(level, message) {
  return `[${new Date().toISOString()}] ${level}: ${message}\n`;
}

/**
 * Writes a log entry to the log file.
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @returns {Promise<void>}
 */
async function log(level, message) {
  await ensureDataDir();
  await appendFile(LOG_FILE, formatLine(level, message), "utf8");
}

/**
 * Logger object with methods for different log levels.
 */
export const logger = {
  /**
   * Logs an informational message.
   * @param {string} message
   * @returns {Promise<void>}
   */
  info: (message) => log("INFO", message),

  /**
   * Logs a warning message.
   * @param {string} message
   * @returns {Promise<void>}
   */
  warn: (message) => log("WARN", message),

  /**
   * Logs an error message.
   * @param {string} message
   * @returns {Promise<void>}
   */
  error: (message) => log("ERROR", message),
};
