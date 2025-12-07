const userService = require('../../services/v1/user.service');

const userController = {
  register: async (req, res, next) => {
    try {
      const registerData = ({ title, firstName, lastName, email, password } = req.body);

      const response = await userService.newUserRegister(registerData);
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

module.exports = userController;
