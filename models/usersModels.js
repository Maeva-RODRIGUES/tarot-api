// Ce fichier définit le modèle User, qui représente les utilisateurs de l'application.
// Utilité: Permet de gérer les informations des utilisateurs dans la base de données.
// usersModels.js

const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
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
      allowNull: false,
      validate: {
        len: {
          args: [8, 100], // Longueur minimale et maximale
          msg: 'Le mot de passe doit contenir au moins 8 caractères'
        }
      }
    },
    id_Roles: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      }
    }
  }, {
    timestamps: true
  });

  // Avant de créer ou mettre à jour un utilisateur, hachez son mot de passe
  const hashPassword = async (user) => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  };

  User.beforeCreate(hashPassword); // Hacher le mot de passe avant la création
  User.beforeUpdate(hashPassword); // Hacher le mot de passe avant la mise à jour

  return User;
};
