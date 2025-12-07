'use strict';

const userTitle = require('../enum/user/title.enum');
const userStatus = require('../enum/user/status.enum');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      displayId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.ENUM(...userTitle.values),
        allowNull: false,
        defaultValue: userTitle.MX,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(...userStatus.values),
        allowNull: false,
        defaultValue: userStatus.ACTIVE,
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // add index on email
    await queryInterface.addIndex('Users', ['email'], {
      name: 'idx_users_email',
      unique: true,
    });

    // add index on display id
    await queryInterface.addIndex('Users', ['displayId'], {
      name: 'idx_users_displayId',
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_title";');
  },
};
