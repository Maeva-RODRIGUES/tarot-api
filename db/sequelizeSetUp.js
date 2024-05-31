// Ce fichier utilise les informations de connexionDatabase.js pour configurer et initialiser Sequelize.

// CONFIG DB
const { Sequelize } = require('sequelize');
require('dotenv').config();
const bcrypt = require('bcrypt');
// const { Card, Theme, User, Review, Role, Interpretation } = require('../models/indexModels');
const dbConfig = require('../config/connexionDatabase');



// Création d'une nouvelle instance de Sequelize avec la configuration de la base de données
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nom de la base de données
    process.env.DB_USER, // Utilisateur de la base de données
    process.env.DB_PASS, // Mot de passe de la base de données
    {
      host: process.env.DB_HOST, // Hôte de la base de données
      dialect: 'mariadb', // Dialecte de la base de données
      port: process.env.DB_PORT || 3306, // Port de la base de données avec une valeur par défaut si non spécifiée
      logging: false // Désactive les logs SQL
    }
  );


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