const enumService = require('../../services/v1/enum.service');

const enumController = {
  title: async (req, res, next) => {
    try {
      const response = await enumService.getAllTitles();
      const { success, status, data } = response;

      res.status(status).json({
        success: success,
        response: {
          status: status,
          data: data,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = enumController;
