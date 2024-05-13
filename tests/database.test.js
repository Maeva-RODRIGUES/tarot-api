// Importer le module Sequelize pour initialiser la connexion à la base de données
const { Sequelize } = require('sequelize');

// Importez la configuration de la base de données
const dbConfig = require('../config/database');

describe('Database Connection Test', () => {
  let sequelize;

  beforeAll(async () => {
    // Initialiser la connexion à la base de données en utilisant la configuration
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      port: dbConfig.port
    });

    // Tester la connexion à la base de données
    try {
      await sequelize.authenticate();
    } catch (error) {
      // Si une erreur se produit, afficher un message d'échec
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  });

  afterAll(async () => {
    // Fermer la connexion à la base de données après les tests
    await sequelize.close();
  });

  test('Database connection should be successful', () => {
    // Si le test arrive ici, cela signifie que la connexion à la base de données a réussi
    expect(sequelize).toBeDefined();
    expect(sequelize.options.host).toBe(dbConfig.host);
    expect(sequelize.options.dialect).toBe(dbConfig.dialect);
    expect(sequelize.options.port).toBe(dbConfig.port);
  });
});
