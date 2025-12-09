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

      // PUT: /password
      PASSWORD_MISMATCH: 'Current password is incorrect!',
      PASSWORD_UPDATED: 'Password updated successfully!',

      // DELETE: /
      DELETED: 'User deleted successfully!',
    },

    // /api/v1/auth
    AUTH: {
      // post: /
      LOGGEDOUT: 'Logged out successfully!',
    },
  },
});
