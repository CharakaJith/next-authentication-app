// input validation messages
export const VALIDATE: { [key: string]: string } = {
  EMPTY_FIELDS: 'Please fill in all required fields.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
};

export const ERROR = {
  AUTH_FAILED: 'Authentication failed',
  NO_TOKEN: 'No access token found',
  UNEXPECTED: 'An unexpected error occurred!',

  LOAD_FAILED: (unit: string) => `Failed to load ${unit}!`,
  DELETE_FAILED: (unit: string) => `Failed to delete ${unit}!`,
} as const;

export const DISPLAY = {
  USER: {
    AUTH: {
      LOGIN: 'Please login to access this page',
      FORBIDDON: 'Permission denied!',
    },
    LOGGED_OUT: 'Logged out successfully',
    DELETED: 'Account deleted successfully',
  },
} as const;
