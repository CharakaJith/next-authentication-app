const authRepo = require('../../repos/v1/auth.repo');
const { STATUS_CODE } = require('../../constants/app.constants');
const { PAYLOAD } = require('../../common/responses');

// blacklisted tokens cache
const blacklistCache = {
  data: new Map(),
  lastFetch: null,
  cacheDuration: 2 * 60 * 1000, // 2 minutes
  isStale: function () {
    return !this.lastFetch || Date.now() - this.lastFetch > this.cacheDuration;
  },
  setTokens: function (tokens) {
    this.data.clear();
    tokens.forEach((token) => {
      this.data.set(token.token, {
        userId: token.userId,
        expiredAt: token.expiredAt,
      });
    });
    this.lastFetch = Date.now();
  },
  hasToken: function (token) {
    return this.data.has(token);
  },
};

const authService = {
  handleLogout: async (data) => {
    const { token, user } = data;

    // insert token
    const tokenDetails = {
      token: token,
      userId: user.id,
    };
    const createdToken = await authRepo.create(tokenDetails);

    // update cache
    if (createdToken) {
      blacklistCache.data.set(token, {
        userId: user.id,
        expiredAt: createdToken.expiredAt,
      });
    }

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        message: PAYLOAD.AUTH.LOGGEDOUT,
      },
    };
  },

  validateToken: async (parsedToken) => {
    try {
      // check cache
      if (blacklistCache.hasToken(parsedToken)) {
        return false;
      }

      // refresh if stale
      if (blacklistCache.isStale()) {
        const allBlacklistedTokens = await authRepo.getAll();
        blacklistCache.setTokens(allBlacklistedTokens);

        // check after refresh
        if (blacklistCache.hasToken(parsedToken)) {
          return false;
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  },
};

module.exports = authService;
