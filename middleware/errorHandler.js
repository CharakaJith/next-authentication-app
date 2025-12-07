const logger = require('./log/logger');
const { APP_ENV, STATUS_CODE } = require('../constants/app.constants');

const errorHandler = (error, req, res, next) => {
  const { status, statusCode, message, stack, errors = [] } = error;
  const httpCode = statusCode || STATUS_CODE.SERVER_ERROR;

  const responseData = {
    message: message,
  };

  // check for additional errors
  if (errors.length !== 0) {
    responseData.errors = errors;
  }

  logger(status, false, httpCode, message, req);

  res.status(httpCode).json({
    success: false,
    response: {
      status: httpCode,
      data: responseData,
      stack: process.env.NODE_ENV === APP_ENV.DEV ? stack : undefined,
    },
  });
};

module.exports = errorHandler;
