module.exports = Object.freeze({
  PAYLOAD: {
    // /api/v1/user
    USER: {
      // GET: /
      NOT_FOUND: 'User not found!',

      // POST: /
      EXISTS: 'User with this email already exists.',

      // POST: /login
      INVALID_CRED: 'Invalid login credentials!',
      INACTIVE: 'Account is inactive or suspended. Please contact support for more information.',
    },

    // /api/v1/auth
    AUTH: {
      // post: /
      LOGGEDOUT: 'Logged out successfully!',
    },
  },
});
