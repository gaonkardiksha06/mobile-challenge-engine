import http from 'http';
import { add } from './math.js';
import { readNotesFile } from './fs-utils.js';

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.url === '/add' && req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const a = Number(url.searchParams.get('a') ?? 0);
    const b = Number(url.searchParams.get('b') ?? 0);
    res.writeHead(200);
    res.end(JSON.stringify({ result: add(a, b) }));
    return;
  }

  if (req.url === '/notes-file' && req.method === 'GET') {
    const notes = await readNotesFile();
    res.writeHead(200);
    res.end(JSON.stringify(notes));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`HTTP server on ${PORT}`);
  });
}

export default server;
