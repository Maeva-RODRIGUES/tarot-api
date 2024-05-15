// Fichier de test pour les routes de l'API avec un échantillon de données fictives.
// tarotRoutes.test.js

const request = require('supertest');
const app = require('../server');
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

const tarotData = require('../tarotData.json');
const themeData = require('../themeData.json');


describe('Test des routes de tarotRoutes.js', () => {
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

// Test de la route pour effectuer un tirage de tarot
test('GET /api/tarot/draw', async () => {
  // Effectuer une requête GET vers la route de tirage de tarot
  const response = await request(app).get('/api/tarot/draw');

  // Vérifier que le statut de la réponse est 200 OK
  expect(response.status).toBe(200);

  // Vérifier que la réponse contient un tirage de tarot avec des cartes
  expect(response.body).toHaveProperty('cards');
});

// Test de la route pour effectuer un tirage de tarot aléatoire
test('GET /api/tarot/draw-random', async () => {
  // Effectuer une requête GET vers la route de tirage de tarot aléatoire
  const response = await request(app).get('/api/tarot/draw-random');

  // Vérifier que le statut de la réponse est 200 OK
  expect(response.status).toBe(200);

  // Vérifier que la réponse contient une carte tirée aléatoirement
  expect(response.body).toHaveProperty('card');
});

// Test de la route pour effectuer un tirage de tarot en fonction du thème choisi
test('GET /api/tarot/draw-theme/:theme', async () => {
  // Définir un thème de test
  const theme = 'love'; // Peut être 'love', 'work' ou 'spiritual' selon ce qui est défini dans le contrôleur

  // Effectuer une requête GET vers la route de tirage de tarot en fonction du thème choisi
  const response = await request(app).get(`/api/tarot/draw-theme/${theme}`);

  // Vérifier que le statut de la réponse est 200 OK
  expect(response.status).toBe(200);

  // Vérifier que la réponse contient les cartes tirées pour le thème choisi
  expect(response.body).toHaveProperty('cards');
});
});