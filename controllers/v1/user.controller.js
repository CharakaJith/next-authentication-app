const userService = require('../../services/v1/user.service');
const { APP_ENV } = require('../../constants/app.constants');

const userController = {
  get: async (req, res, next) => {
    try {
      const getData = req.user;

      const response = await userService.getUserDetails(getData);
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

  login: async (req, res, next) => {
    try {
      const loginData = ({ email, password } = req.body);

      const response = await userService.userLogin(loginData);
      const { success, status, data, accessToken, refreshToken } = response;

      // set access token
      res.set({
        'Access-Token': accessToken,
      });

      // set refresh token in a http-only cookie
      const isSecure = process.env.NODE_ENV === APP_ENV.DEV ? false : true;
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'Strict',
        path: '/',
      });

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

  delete: async (req, res, next) => {
    try {
      const deleteData = req.user;
      deleteData.token = req.headers.authorization;

      const response = await userService.deactivateUser(deleteData);
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
