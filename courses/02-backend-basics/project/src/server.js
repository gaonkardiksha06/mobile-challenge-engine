import 'dotenv/config';

import { createServer } from 'node:http';
import express from 'express';

import mainApp from './app.js';
import { connectDB } from './db.js';
import { readNotes, writeNotes, appendNote } from './fs-utils.js';
import { average, max, lineLengths } from './math.js';
import { logger } from './logger.js';

const PORT = process.env.PORT || 3000;

// Legacy Challenge 01 server
const server = express();

server.use(express.json());

server.get('/', (_req, res) => {
  res.json({
    message: 'Node.js Basics API',
    routes: [
      'GET /notes',
      'POST /notes  { "content": string }',
      'POST /notes/append  { "line": string }',
      'GET /notes/stats',
    ],
  });
});

server.get('/notes', async (_req, res, next) => {
  try {
    const content = await readNotes();
    res.json({ content });
  } catch (error) {
    next(error);
  }
});

server.post('/notes', async (req, res, next) => {
  try {
    const { content } = req.body ?? {};

    if (typeof content !== 'string') {
      return res.status(400).json({
        error: '"content" must be a string',
      });
    }

    await writeNotes(content);
    await logger.info('Notes file overwritten');

    return res.json({
      message: 'Notes saved',
    });
  } catch (error) {
    return next(error);
  }
});

server.post('/notes/append', async (req, res, next) => {
  try {
    const { line } = req.body ?? {};

    if (typeof line !== 'string' || line.length === 0) {
      return res.status(400).json({
        error: '"line" must be a non-empty string',
      });
    }

    await appendNote(line);
    await logger.info('Note appended');

    return res.json({
      message: 'Note appended',
    });
  } catch (error) {
    return next(error);
  }
});

server.get('/notes/stats', async (_req, res, next) => {
  try {
    const content = await readNotes();
    const lengths = lineLengths(content);

    res.json({
      lineCount: lengths.length,
      averageLineLength: average(lengths),
      longestLine: max(lengths),
    });
  } catch (error) {
    next(error);
  }
});

// Legacy error handler
// eslint-disable-next-line no-unused-vars
server.use((err, _req, res, _next) => {
  logger.error(err.message);
  res.status(500).json({
    error: 'Internal server error',
  });
});

// Mount the Express application containing /health and /api/*
server.use(mainApp);

const httpServer = createServer(server);

async function startServer() {
  try {
    await connectDB();
  } catch (error) {
    logger.error(`DB connection failed: ${error.message}`);
  }

  httpServer.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default httpServer;