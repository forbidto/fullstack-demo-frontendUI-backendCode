const { DataTypes } = require('sequelize');
const { sequelize }  = require('../config/postgreConfig'); // Adjust the path to your Sequelize instance

const UserToken = sequelize.define('UserToken', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  
  module.exports = UserToken;