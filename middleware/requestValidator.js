const { ZodError } = require('zod');
const { VALIDATION } = require('../common/messages');

const requestValidator = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (error) {
    // check for zod errors
    if (error instanceof ZodError) {
      const errors = error.issues || [];
      const errorMessages = errors.map((err) => {
        // remove error prefix
        const path = err.path?.filter((part) => part !== 'body' && part !== 'query' && part !== 'params') || [];

        return {
          field: path.join('.') || 'unknown',
          message: err.message || VALIDATION.FAILED,
        };
      });

      // new validation error
      const validationError = new Error(VALIDATION.FAILED);
      validationError.statusCode = 400;
      validationError.errors = errorMessages;
      validationError.message = VALIDATION.FAILED;

      return next(validationError);
    }

    // error fallback
    return next(error);
  }
};

module.exports = requestValidator;
