'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlacklistedToken extends Model {
    static associate(models) {
      // single blacklisted token can balong to single user
      BlacklistedToken.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  BlacklistedToken.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'BlacklistedToken',
      tableName: 'BlacklistedTokens',
      underscored: false,
      timestamps: true,
    }
  );

  return BlacklistedToken;
};
