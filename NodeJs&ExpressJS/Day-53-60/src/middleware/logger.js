const morgan = require('morgan');

/**
 * HTTP request logger middleware.
 * Uses 'combined' format in production (includes IP, user-agent, etc.)
 * Uses 'dev' format in development (colorized, concise)
 * Silent in test environment.
 */
const logger =
  process.env.NODE_ENV === 'test'
    ? (_req, _res, next) => next() // No-op in tests
    : morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev');

module.exports = logger;
