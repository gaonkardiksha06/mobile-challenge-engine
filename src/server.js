// src/server.js
import "dotenv/config";
import { createServer } from "node:http";
import express from "express";

import mainApp from "./app.js";
import { connectDB } from "./db.js";
import { readNotes, writeNotes, appendNote } from "./fs-utils.js";
import { average, max, lineLengths } from "./math.js";
import { logger } from "./logger.js";

// ✅ Import the auth router
import authRouter from "./routes/auth.js";

const PORT = process.env.PORT || 3000;

// Legacy Challenge 01 server
const server = express();
server.use(express.json());

// Root route
server.get("/", (_req, res) => {
  res.json({
    message: "Node.js Basics API",
    routes: [
      "GET /notes",
      'POST /notes  { "content": string }',
      'POST /notes/append  { "line": string }',
      "GET /notes/stats",
      "POST /auth/register  { email, password }",
      "POST /auth/login  { email, password }",
      "GET /auth/profile  (requires Bearer token)",
    ],
  });
});

// Notes routes
server.get("/notes", async (_req, res, next) => {
  try {
    const content = await readNotes();
    res.json({ content });
  } catch (error) {
    next(error);
  }
});

server.post("/notes", async (req, res, next) => {
  try {
    const { content } = req.body ?? {};
    if (typeof content !== "string") {
      return res.status(400).json({ error: '"content" must be a string' });
    }

    await writeNotes(content);
    await logger.info("Notes file overwritten");

    res.json({ message: "Notes saved" });
  } catch (error) {
    next(error);
  }
});

server.post("/notes/append", async (req, res, next) => {
  try {
    const { line } = req.body ?? {};
    if (typeof line !== "string" || line.length === 0) {
      return res.status(400).json({ error: '"line" must be a non-empty string' });
    }

    await appendNote(line);
    await logger.info("Note appended");

    res.json({ message: "Note appended" });
  } catch (error) {
    next(error);
  }
});

server.get("/notes/stats", async (_req, res, next) => {
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

// Error handler
server.use(async (err, _req, res, _next) => {
  await logger.error(err.stack || err.message);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 404 ? "Resource not found" : "Internal server error",
  });
});

// ✅ Mount the auth routes at /auth
server.use("/auth", authRouter);

// Mount the Express application containing /health and /api/*
server.use(mainApp);

const httpServer = createServer(server);

async function startServer() {
  try {
    await connectDB(); // ✅ Connect MongoDB before listening
    httpServer.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    await logger.error(`DB connection failed: ${error.stack || error.message}`);
    process.exit(1);
  }
}

// Prevent Playwright conflicts: don’t auto-start in test mode
if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default httpServer;
