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

  // repository layer messages
  REPO: {
    FAILED: {
      CREATE: (entity, error) => `Failed to create new ${entity}: ${error}`,
      GET: {
        ALL: (entity, error) => `Failed to retrieve all ${entity}: ${error}`,
        BY_EMAIL: (entity, error) => `Failed to retrieve ${entity} by email: ${error}`,
        BY_ID: (entity, error) => `Failed to retrieve ${entity} by ID: ${error}`,
      },
      UPDATE: (entity, error) => `Failed to update ${entity}: ${error}`,
    },
  },
});
