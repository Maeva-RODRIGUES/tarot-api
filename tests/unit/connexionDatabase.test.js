//connexionDatabase.test.js

// Importer le module Sequelize pour initialiser la connexion à la base de données
const { Sequelize } = require('sequelize');

// Importez la configuration de la base de données
const config = require('../../config/connexionDatabase');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    port: process.env.DB_PORT || 3307,
  }
);

test('Database connection should be successful', async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
});