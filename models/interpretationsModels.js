// Ce fichier définit le modèle Interpretation, qui représente les interprétations associées aux cartes dans un thème spécifique.
// Utilité: Permet de gérer les interprétations des cartes de tarot selon différents thèmes dans la base de données.
const { DataTypes } = require('sequelize');
// const sequelize = require('../config/sequelizeSetUp');
const Theme = require('./themesModels');

const Interpretation = sequelize.define('Interpretation', {
  meaning: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  id_Themes: {
    type: DataTypes.INTEGER,
    references: {
      model: Theme,
      key: 'id'
    }
  }
});

module.exports = Interpretation;
