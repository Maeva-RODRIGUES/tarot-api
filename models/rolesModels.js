// Ce fichier définit le modèle Role, qui représente les différents rôles des utilisateurs (comme admin, utilisateur standard).
// Utilité: Permet de gérer les rôles des utilisateurs dans la base de données.

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Role;
};

