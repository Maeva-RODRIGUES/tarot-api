// Ce fichier définit le modèle Review, qui représente les avis laissés par les utilisateurs.
// Utilité: Permet de gérer les avis des utilisateurs dans la base de données.

const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelizeSetUp');
const User = require('./usersModels');

const Review = sequelize.define('Review', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id_Users: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

module.exports = Review;
