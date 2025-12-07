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

  // jwt service messages
  JWT: {
    GENERATE: {
      FAILED: (token, error) => `Failed to generate ${token} token: ${error}`,
    },
    REFRESH: {
      SUCCESS: 'JWT refreshed successfully',
      FAILED: (error) => `Failed to refresh access token: ${error}`,
    },
    AUTH: {
      FAILED: 'Authentication failed!',
      FORBIDDEN: 'Access denied!',
    },
  },
});
