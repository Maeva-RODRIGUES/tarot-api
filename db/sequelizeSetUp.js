// Ce fichier utilise les informations de connexionDatabase.js pour configurer et initialiser Sequelize.

// CONFIG DB
const { Sequelize } = require('sequelize');
require('dotenv').config();


// Création d'une nouvelle instance de Sequelize avec la configuration de la base de données
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
      host: process.env.DB_HOST, 
      dialect: 'mariadb',
      port: process.env.DB_PORT || 3306,
      logging: false // Désactive les logs SQL
    }
  );


// Définition des relations entre les modèles
// Exemple : Cards.hasMany(Interpretations);

// Si l'environnement est "development", la base de données sera réinitialisée

// Synchronisation de Sequelize avec la base de données
sequelize.sync().then(() => {
    console.log('Models synchronized with the database.');
  });


 // Création des rôles

 // Création des utilisateurs à partir des données fictives


// Authentification à la base de données
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


// Exportation des modèles et de l'instance de Sequelize   
module.exports = sequelize;