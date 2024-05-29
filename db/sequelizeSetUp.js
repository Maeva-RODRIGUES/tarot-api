// Ce fichier utilise les informations de connexionDatabase.js pour configurer et initialiser Sequelize.

// CONFIG DB
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
// const { Card, Theme, User, Review, Role, Interpretation } = require('../models/indexModels');
const dbConfig = require('../config/connexionDatabase');



// Création d'une nouvelle instance de Sequelize avec la configuration de la base de données
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: false  // désactive les logs SQL
});


// Initialisation des modèles de données avec Sequelize
// const Cards = Card (sequelize);
// const Users = User (sequelize);
// const Roles = Role (sequelize);
// const Themes = Theme (sequelize);
// const Interpretations = Interpretation (sequelize);
// const Reviews = Review (sequelize);


// Définition des relations entre les modèles

// Si l'environnement est "development", la base de données sera réinitialisée

// Synchronisation de Sequelize avec la base de données


// Authentification à la base de données
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;