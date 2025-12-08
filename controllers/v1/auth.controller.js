const authService = require('../../services/v1/auth.service');

const authController = {
  logout: async (req, res, next) => {
    try {
      const logoutData = {};
      logoutData.token = req.headers.authorization;
      logoutData.user = req.user;

      const response = await authService.handleLogout(logoutData);
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

module.exports = authController;
