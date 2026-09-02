const ApiError = require('../utils/ApiError');

/**
 * Zod validation middleware factory.
 * Validates req.body against the provided Zod schema.
 *
 * Usage: validate(registerSchema)
 *
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against
 * @param {'body'|'query'|'params'} source - Which part of request to validate
 */
const validate = (schema, source = 'body') => {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      // Flatten Zod errors into a readable array
      const errors = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      const error = new ApiError(400, 'Validation failed');
      error.errors = errors;
      return next(error);
    }

    // Replace req[source] with the parsed (sanitized) data
    req[source] = result.data;
    next();
  };
};

module.exports = validate;
