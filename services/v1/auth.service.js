const authRepo = require('../../repos/v1/auth.repo');
const { STATUS_CODE } = require('../../constants/app.constants');
const { PAYLOAD } = require('../../common/responses');

const authService = {
  handleLogout: async (data) => {
    const { token, user } = data;

    // insert token
    const tokenDetails = {
      token: token,
      userId: user.id,
    };
    await authRepo.create(tokenDetails);

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        message: PAYLOAD.AUTH.LOGGEDOUT,
      },
    };
  },

  validateToken: async (token) => {
    var blacklistedTokens = await authRepo.getAll();

    // check if token is blacklisted
    blacklistedTokens = blacklistedTokens.filter((t) => t.token === token);

    return blacklistedTokens.length === 0;
  },
};

module.exports = authService;
