// ce fichier contient les modèles definis suivants : TarotCard : Ce modèle représente les cartes de tarot et contient des champs pour le nom de la carte, sa description et sa position.
// TarotDrawing : Ce modèle représente les tirages de tarot et contient un champ pour la date du tirage.


// Importation des modules Sequelize nécessaires
const { DataTypes, Sequelize } = require('sequelize');

// Importation de l'instance de connexion Sequelize configurée dans le fichier database.js
const sequelize = require('../config/database');

// Définition du modèle de données pour les cartes de tarot
const TarotCard = sequelize.define('TarotCard', {
  name: {
    type: DataTypes.STRING,
    allowNull: false // La carte doit avoir un nom
  },
  description: {
    type: DataTypes.TEXT, // Utilisez TEXT pour des descriptions plus longues
    allowNull: false // La carte doit avoir une description
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false // La carte doit avoir une position
  }
});

// Définition du modèle de données pour les tirages de tarot
const TarotDrawing = sequelize.define('TarotDrawing', {
  date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW // Date par défaut : maintenant
  }
});

// Définition des relations entre les tables
TarotDrawing.belongsTo(TarotCard, { foreignKey: 'tarotCardId' });
// Un tirage appartient à une carte de tarot
// 'tarotCardId' est la clé étrangère qui sera ajoutée dans la table TarotDrawing

// Synchronisation des modèles avec la base de données
(async () => {
  await sequelize.sync({ force: false });
  // La méthode sync synchronise les modèles avec la base de données
  // Si force est true, cela supprimera les tables existantes et les recréera
  // Si force est false, cela ne fera rien si les tables existent déjà
  console.log('Les modèles ont été synchronisés avec la base de données.');
})();

// Exportation des modèles TarotCard et TarotDrawing pour les utiliser ailleurs dans l'application
module.exports = { TarotCard, TarotDrawing };
