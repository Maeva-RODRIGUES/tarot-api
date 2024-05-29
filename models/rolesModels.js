const { DataTypes } = require('sequelize');
//const sequelize = require('../config/sequelizeSetUp');

const Role = sequelize.define('Role', {
  role_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Role;
