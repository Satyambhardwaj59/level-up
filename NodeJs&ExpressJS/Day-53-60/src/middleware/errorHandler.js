const ApiError = require('../utils/ApiError');

/**
 * Global error handling middleware.
 * Must be registered LAST in Express (after all routes).
 *
 * Handles:
 *  - ApiError (operational errors we threw intentionally)
 *  - Mongoose CastError (invalid ObjectId → 400)
 *  - Mongoose ValidationError (schema validation → 400)
 *  - Mongoose duplicate key error (code 11000 → 409)
 *  - JWT errors (handled in authMiddleware, but caught here as fallback)
 *  - Unknown errors → 500 (no leak of internals in production)
 */
const errorHandler = (err, req, res, _next) => {
  let error = err;

  // ── Mongoose: Invalid ObjectId ───────────────────────────────────────────────
  if (err.name === 'CastError') {
    error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  // ── Mongoose: Validation errors ──────────────────────────────────────────────
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, messages.join('. '));
  }

  // ── Mongoose: Duplicate key ──────────────────────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(409, `${field} already exists.`);
  }

  // ── JWT errors (fallback) ────────────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid token.');
  }
  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Token has expired.');
  }

  // ── Determine final status code and message ──────────────────────────────────
  const statusCode = error.statusCode || 500;
  const message =
    error.isOperational
      ? error.message
      : process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred.'
      : error.message;

  // ── Log unexpected errors (not in test env) ──────────────────────────────────
  if (!error.isOperational && process.env.NODE_ENV !== 'test') {
    console.error('💥 Unexpected error:', err);
  }

  const response = {
    success: false,
    message,
  };

  // Include validation errors array if present
  if (error.errors) {
    response.errors = error.errors;
  }

  // Include stack trace in development for debugging
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
