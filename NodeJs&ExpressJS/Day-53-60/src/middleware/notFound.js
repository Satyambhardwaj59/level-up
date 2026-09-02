const ApiError = require('../utils/ApiError');

/**
 * 404 Not Found middleware.
 * Catches any request that didn't match a defined route.
 */
const notFound = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

module.exports = notFound;
