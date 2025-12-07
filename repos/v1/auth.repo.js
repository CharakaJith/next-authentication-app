const models = require('../../models');

const CustomError = require('../../util/customError');
const { REPO } = require('../../common/messages');
const { STATUS_CODE } = require('../../constants/app.constants');

const ENTITY = 'blacklistedToken';
const Token = models.BlacklistedToken;

const authRepo = {
  create: async (token) => {
    try {
      return await Token.create(token);
    } catch (error) {
      throw new CustomError(REPO.FAILED.CREATE(ENTITY, error.message), STATUS_CODE.SERVER_ERROR);
    }
  },

  getAll: async () => {
    try {
      return await Token.findAll();
    } catch (error) {
      throw new CustomError(REPO.FAILED.GET.ALL(ENTITY, error.message), STATUS_CODE.SERVER_ERROR);
    }
  },
};

module.exports = authRepo;
