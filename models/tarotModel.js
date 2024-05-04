const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mariadb'
});

// Modèle de données pour les cartes de tarot
const TarotCard = sequelize.define('TarotCard', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Modèle de données pour les tirages de tarot
const TarotDrawing = sequelize.define('TarotDrawing', {
  date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
  // Ajoutez d'autres attributs si nécessaire
});

// Définir les relations entre les tables si nécessaire
TarotDrawing.belongsTo(User); // Exemple : Un tirage appartient à un utilisateur
TarotDrawing.belongsTo(Theme); // Exemple : Un tirage est associé à un thème

// Synchroniser les modèles avec la base de données
(async () => {
  await sequelize.sync({ force: false });
  console.log('Les modèles ont été synchronisés avec la base de données.');
})();

module.exports = { TarotCard, TarotDrawing };
