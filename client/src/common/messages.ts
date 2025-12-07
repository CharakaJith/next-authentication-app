// input validation messages
export const VALIDATE: { [key: string]: string } = {
  EMPTY_FIELDS: 'Please fill in all required fields.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
};

export const ERROR = {
  AUTH_FAILED: 'Authentication failed!',
  NO_TOKEN: 'No access token found!',
  UNEXPECTED: 'An unexpected error occurred!',

  LOAD_FAILED: (unit: string) => `Failed to load ${unit}!`,
} as const;

export const DISPLAY = {
  USER: {
    AUTH: {
      LOGIN: 'Please login to access this page!',
      FORBIDDON: 'Permission denied!',
    },
    CREATED: 'User created successfully',
    DELETED: 'User deleted successfully',
    DETAILS_UPDATED: 'Details updated successfully',
    PASSWORD_UPDATED: 'Password updated successfully',
    LOGGED_OUT: 'Logged out successfully',
  },
} as const;
