// Ce fichier définit le modèle User, qui représente les utilisateurs de l'application.
// Utilité: Permet de gérer les informations des utilisateurs dans la base de données.

onst { DataTypes } = require('sequelize');
//const sequelize = require('../config/sequelizeSetUp');
//const Role = require('./rolesModels');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false
  },
  city_of_birth: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time_of_birth: {
    type: DataTypes.TIME,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  id_Roles: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  }
});

module.exports = User;
