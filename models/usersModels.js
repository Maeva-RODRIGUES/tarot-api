// Ce fichier définit le modèle User, qui représente les utilisateurs de l'application.
// Utilité: Permet de gérer les informations des utilisateurs dans la base de données.

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // ... attributs du modèle
  });

  // Hook hashage de mot de passe avant d'être enregistré
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

  return User;
};
