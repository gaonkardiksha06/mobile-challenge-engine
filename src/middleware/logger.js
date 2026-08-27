import { logger } from '../logger.js';

/**
 * Middleware to log incoming requests with method, URL, status, and duration.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
export function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
}

/**
 * Middleware to handle errors and send JSON responses.
 * @param {Error} err - Error object
 * @param {import('express').Request} _req - Express request object (unused)
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} _next - Express next middleware function (unused)
 */
export function errorHandler(err, _req, res, _next) {
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
}
