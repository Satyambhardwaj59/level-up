/**
 * Custom API Error class
 * Extends the native Error class with HTTP status code support.
 * isOperational = true means we handled this error intentionally (vs. a bug).
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (e.g. 400, 401, 404)
   * @param {string} message    - Human-readable error message
   * @param {boolean} isOperational - true for expected errors, false for bugs
   */
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // Capture stack trace (excluding ApiError constructor itself)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
