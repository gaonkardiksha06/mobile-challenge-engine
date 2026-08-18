import { createServer } from 'node:http';
import { readNotes, writeNotes, appendNote } from './fs-utils.js';
import { average, max, lineLengths } from './math.js';
import { logger } from './logger.js';

const PORT = process.env.PORT || 3000;

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    const MAX_BYTES = 1_000_000;

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BYTES) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      body += chunk;
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });

    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

const server = createServer(async (req, res) => {
  const { method, url } = req;

  try {
    if (method === 'GET' && url === '/') {
      sendJson(res, 200, {
        message: 'Node.js Basics API',
        routes: [
          'GET /notes',
          'POST /notes  { "content": string }',
          'POST /notes/append  { "line": string }',
          'GET /notes/stats',
        ],
      });
      return;
    }

    if (method === 'GET' && url === '/notes') {
      const content = await readNotes();
      sendJson(res, 200, { content });
      return;
    }

    if (method === 'POST' && url === '/notes') {
      const { content } = await readJsonBody(req);
      if (typeof content !== 'string') {
        sendJson(res, 400, { error: '"content" must be a string' });
        return;
      }
      await writeNotes(content);
      await logger.info('Notes file overwritten');
      sendJson(res, 200, { message: 'Notes saved' });
      return;
    }

    if (method === 'POST' && url === '/notes/append') {
      const { line } = await readJsonBody(req);
      if (typeof line !== 'string' || line.length === 0) {
        sendJson(res, 400, { error: '"line" must be a non-empty string' });
        return;
      }
      await appendNote(line);
      await logger.info('Note appended');
      sendJson(res, 200, { message: 'Note appended' });
      return;
    }

    if (method === 'GET' && url === '/notes/stats') {
      const content = await readNotes();
      const lengths = lineLengths(content);
      sendJson(res, 200, {
        lineCount: lengths.length,
        averageLineLength: average(lengths),
        longestLine: max(lengths),
      });
      return;
    }

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    await logger.error(error.message);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});

export default server;