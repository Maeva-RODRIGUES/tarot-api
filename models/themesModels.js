// Ce fichier définit le modèle Theme, qui représente les différents thèmes de tirage de tarot (comme Amour, Carrière et Spiritualité).
// Utilité: Permet de gérer les informations des thèmes de tirage de tarot dans la base de données.
// themesModels.js

module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('Theme', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title_theme: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meaning_theme: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  return Theme;
};

