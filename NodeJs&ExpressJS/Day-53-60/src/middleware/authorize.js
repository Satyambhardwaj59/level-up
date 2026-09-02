const ApiError = require('../utils/ApiError');

/**
 * Role-based access control middleware.
 * Must be used AFTER the protect middleware (req.user must exist).
 *
 * Usage: authorize('admin')  OR  authorize('admin', 'user')
 *
 * @param {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Not authenticated.'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Access denied. Required role(s): ${roles.join(', ')}. Your role: ${req.user.role}.`
        )
      );
    }

    next();
  };
};

module.exports = authorize;
