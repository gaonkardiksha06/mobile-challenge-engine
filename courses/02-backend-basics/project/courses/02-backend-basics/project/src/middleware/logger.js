export function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
}

export function errorHandler(err, _req, res, _next) {
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
}
