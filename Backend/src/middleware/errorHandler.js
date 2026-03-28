/**
 * Centralised error handler.
 * Must be the last middleware registered in Express.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV !== 'production';

  // Prisma known errors
  if (err.code === 'P2002') {
    // Unique constraint violation
    const field = err.meta?.target?.[0] ?? 'field';
    return res.status(409).json({
      error: 'Conflict',
      message: `A record with that ${field} already exists`,
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Not found', message: err.message });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Unauthorized', message: 'Token expired' });
  }

  const status = err.status ?? err.statusCode ?? 500;
  const message = status < 500 || isDev ? err.message : 'Internal server error';

  if (status >= 500) {
    console.error('[error]', err);
  }

  return res.status(status).json({
    error: err.name ?? 'Error',
    message,
    ...(isDev && status >= 500 ? { stack: err.stack } : {}),
  });
}
