module.exports = Object.freeze({
  // cors
  CORS: {
    INVALID: 'Not allowed by CORS!',
  },

  // database initialization
  DATABASE: {
    CONNECTION: {
      SUCCESS: 'Connection has been established successfully.',
      FAILED: (error) => `Unable to connect to the database: ${error}`,
    },
  },

  // validation
  VALIDATION: {
    FAILED: 'Request validation failed.',
  },
});
