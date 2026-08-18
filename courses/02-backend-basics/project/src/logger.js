import { appendFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const LOG_FILE = path.join(DATA_DIR, 'app.log');

function formatLine(level, message) {
  return `[${new Date().toISOString()}] ${level}: ${message}\n`;
}

async function log(level, message) {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(LOG_FILE, formatLine(level, message), 'utf8');
}

export const logger = {
  info: (message) => log('INFO', message),
  warn: (message) => log('WARN', message),
  error: (message) => log('ERROR', message),
};
