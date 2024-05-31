// Ce fichier définit le modèle User, qui représente les utilisateurs de l'application.
// Utilité: Permet de gérer les informations des utilisateurs dans la base de données.

const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelizeSetUp');
const Role = require('./rolesModels');
const bcrypt = require('bcrypt');

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


//Hook hashage de mot de passe avant d'être enregistré
User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(10); // Générer un salt avec 10 tours
  user.password = await bcrypt.hash(user.password, salt); // Hacher le mot de passe
});

User.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});


module.exports = User;
