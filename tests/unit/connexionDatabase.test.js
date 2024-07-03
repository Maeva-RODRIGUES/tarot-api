//connexionDatabase.test.js

// Importer le module Sequelize pour initialiser la connexion à la base de données
const { Sequelize } = require('sequelize');

// Importez la configuration de la base de données
const config = require('../../config/connexionDatabase');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect
});

test('Database connection should be successful', async () => {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
  }
});