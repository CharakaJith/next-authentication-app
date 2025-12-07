const { Op } = require('sequelize');
const models = require('../../models');

const CustomError = require('../../util/customError');
const userStatus = require('../../enum/user/status.enum');
const { REPO } = require('../../common/messages');
const { STATUS_CODE } = require('../../constants/app.constants');

const ENTITY = 'user';
const User = models.User;

const userRepo = {
  create: async (user) => {
    try {
      return await User.create(user);
    } catch (error) {
      throw new CustomError(REPO.FAILED.CREATE(ENTITY, error.message), STATUS_CODE.SERVER_ERROR);
    }
  },

  getByEmail: async (email) => {
    try {
      return await User.findOne({
        where: {
          email: email,
          status: {
            [Op.ne]: userStatus.DELETED,
          },
        },
      });
    } catch (error) {
      throw new CustomError(REPO.FAILED.GET.BY_EMAIL(ENTITY, error.message), STATUS_CODE.SERVER_ERROR);
    }
  },

  update: async (user) => {
    try {
      return await user.save();
    } catch (error) {
      throw new CustomError(REPO.FAILED.UPDATE(ENTITY, error.message), STATUS_CODE.SERVER_ERROR);
    }
  },
};

module.exports = userRepo;
