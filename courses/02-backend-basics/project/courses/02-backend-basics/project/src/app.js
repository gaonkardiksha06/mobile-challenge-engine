import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import notesRouter from './routes/notes.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import { requestLogger, errorHandler } from './middleware/logger.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    jwtReady: typeof jwt.sign === 'function',
  });
});

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

export default app;