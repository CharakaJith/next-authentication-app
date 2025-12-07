const { success } = require('zod');
const userTitles = require('../../enum/user/title.enum');
const { STATUS_CODE } = require('../../constants/app.constants');

const enumService = {
  getAllTitles: async () => {
    const titlesArray = Object.entries(userTitles)
      .filter(([key]) => key !== 'values')
      .map(([key, value]) => ({ key, value }));

    return {
      success: true,
      status: STATUS_CODE.CREATED,
      data: {
        titles: titlesArray,
      },
    };
  },
};

module.exports = enumService;
