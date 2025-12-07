const logger = require('../log/logger');
const { STATUS_CODE } = require('../../constants/app.constants');
const { JWT } = require('../../common/messages');
const { LOG_TYPE } = require('../../constants/logger.constants');

const authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      // check request user role
      if (!user || !user.role) {
        const statusCode = STATUS_CODE.UNAUTHORIZED;
        return res.status(statusCode).json({
          success: false,
          response: {
            status: statusCode,
            data: JWT.AUTH.UNAUTHORIZED,
          },
        });
      }

      // validate user role
      if (!allowedRoles.includes(user.role)) {
        const statusCode = STATUS_CODE.FORBIDDEN;
        logger(LOG_TYPE.WARN, false, statusCode, `Access denied for role: ${user.role}`, req);
        return res.status(statusCode).json({
          success: false,
          response: {
            status: statusCode,
            data: JWT.AUTH.FORBIDDEN,
          },
        });
      }

      next();
    } catch (error) {
      const statusCode = STATUS_CODE.FORBIDDEN;
      res.status(statusCode).json({
        success: false,
        response: {
          status: statusCode,
          data: JWT.AUTH.FORBIDDEN,
        },
      });

      logger(LOG_TYPE.ERROR, false, statusCode, error.message, req);
    }
  };
};

module.exports = authorize;
