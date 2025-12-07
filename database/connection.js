const { Sequelize } = require('sequelize');
const logger = require('../middleware/log/logger');
const { DATABASE } = require('../common/messages');
const { LOG_TYPE } = require('../constants/logger.constants');
const { STATUS_CODE } = require('../constants/app.constants');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

// sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
  pool: {
    max: parseInt(config.connections),
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
});

// test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log(DATABASE.CONNECTION.SUCCESS);
  })
  .catch((error) => {
    logger(LOG_TYPE.FAIL, false, STATUS_CODE.SURVICE_UNAVAILABLE, DATABASE.CONNECTION.FAILED(error));

    console.error(DATABASE.CONNECTION.FAILED(error.message));
    process.exit();
  });

module.exports = sequelize;
