const rateLimit = require('express-rate-limit');

/**
 * General rate limiter — applied to all API routes
 * 100 requests per 15 minutes per IP
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,   // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,     // Disable X-RateLimit-* headers
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  skip: () => process.env.NODE_ENV === 'test', // Skip rate limiting in tests
});

/**
 * Auth rate limiter — stricter, applied to login/register
 * 10 requests per 15 minutes per IP
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again in 15 minutes.',
  },
  skip: () => process.env.NODE_ENV === 'test', // Skip rate limiting in tests
});

module.exports = { generalLimiter, authLimiter };
