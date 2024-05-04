const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
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
// Par exemple : Un tirage appartient à un utilisateur
// TarotDrawing.belongsTo(User);
// Par exemple : Un tirage est associé à un thème
// TarotDrawing.belongsTo(Theme);

// Synchroniser les modèles avec la base de données
(async () => {
  await sequelize.sync({ force: false });
  console.log('Les modèles ont été synchronisés avec la base de données.');
})();

module.exports = { TarotCard, TarotDrawing };
