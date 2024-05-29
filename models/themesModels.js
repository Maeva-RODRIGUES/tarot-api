const { DataTypes } = require('sequelize');
// const sequelize = require('../config/sequelizeSetUp');

const Theme = sequelize.define('Theme', {
  title_theme: {
    type: DataTypes.STRING,
    allowNull: false
  },
  meaning_theme: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Theme;
