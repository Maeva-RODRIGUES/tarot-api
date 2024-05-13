// Fichier de test pour les routes de l'API avec un échantillon de données fictives.
// tarotRoutes.test.js


const request = require('supertest');
const app = require('../server');
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

const tarotData = require('../tarotData.json');




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
    // Simulation jeu de tarot
    const tarotDeck = tarotData;

    // Effectuer une requête GET vers la route de tirage de tarot
    const response = await request(app).get('/api/tarot/draw');

    // Vérifier que le statut de la réponse est 200 OK
    expect(response.status).toBe(200);

    // Vérifier que la réponse contient un tirage de tarot avec des cartes
    expect(response.body).toHaveProperty('tarotReading');

    expect(response.body.tarotReading).toHaveProperty('past');
    expect(response.body.tarotReading).toHaveProperty('present');
    expect(response.body.tarotReading).toHaveProperty('future');

    // Vérifier que les cartes tirées font partie du jeu de tarot simulé
//     expect(tarotDeck.some(card => card.name === response.body.tarotReading.past.split('.')[0].trim())).toBeTruthy();
//     expect(tarotDeck.some(card => card.name === response.body.tarotReading.present.split('.')[0].trim())).toBeTruthy();
//     expect(tarotDeck.some(card => card.name === response.body.tarotReading.future.split('.')[0].trim())).toBeTruthy();
 });
 });



