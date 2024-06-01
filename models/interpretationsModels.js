// Ce fichier définit le modèle Interpretation, qui représente les interprétations associées aux cartes dans un thème spécifique.
// Utilité: Permet de gérer les interprétations des cartes de tarot selon différents thèmes dans la base de données.

module.exports = (sequelize, DataTypes) => {
  const Interpretation = sequelize.define('Interpretation', {
    meaning: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_Themes: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Themes', 
        key: 'id'
      }
    }
  });

  return Interpretation;
};

