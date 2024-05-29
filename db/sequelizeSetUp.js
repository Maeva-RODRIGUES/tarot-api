// Ce fichier utilise les informations de connexionDatabase.js pour configurer et initialiser Sequelize.

const { Sequelize } = require('sequelize');
const dbConfig = require('../config/connexionDatabase');



const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: false  // désactive la journalisation des requêtes SQL (SELECT 1+1 AS result)
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;