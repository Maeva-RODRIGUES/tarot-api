// Ce fichier définit le modèle Theme, qui représente les différents thèmes de tirage de tarot (comme Amour, Carrière et Spiritualité).
// Utilité: Permet de gérer les informations des thèmes de tirage de tarot dans la base de données.

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
