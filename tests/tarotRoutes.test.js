// Fichier de test pour les routes de l'API avec un échantillon de données fictives.
// tarotRoutes.test.js


const request = require('supertest');
const app = require('../server'); // Assurez-vous d'importer correctement votre application Express

describe('Test des routes de tarotRoutes.js', () => {
  // Test de la route pour effectuer un tirage de tarot
  test('GET /api/tarot/draw', async () => {
    // Simulation jeu de tarot
    const tarotDeck = [
      { name: 'The Fool', meaning: 'Beginnings, innocence, spontaneity' },
      { name: 'The Magician', meaning: 'Manifestation, resourcefulness, power' },
      { name: 'The High Priestess', meaning: 'Intuition, unconscious, mystery' },
      { name: 'The Empress', meaning: 'Fertility, nurturing, abundance' },
      { name: 'The Emperor', meaning: 'Authority, structure, control' },
      { name: 'The Hierophant', meaning: 'Tradition, conformity, morality' },
      { name: 'The Lovers', meaning: 'Partnerships, duality, union' },
      { name: 'The Chariot', meaning: 'Willpower, determination, victory' },
      { name: 'Strength', meaning: 'Courage, inner strength, compassion' },
      { name: 'The Hermit', meaning: 'Soul-searching, introspection, solitude' },
      { name: 'Wheel of Fortune', meaning: 'Change, cycles, destiny' },
      { name: 'Justice', meaning: 'Fairness, balance, truth' },
      { name: 'The Hanged Man', meaning: 'Sacrifice, release, suspension' },
      { name: 'Death', meaning: 'Endings, transformation, new beginnings' },
      { name: 'Temperance', meaning: 'Balance, moderation, patience' },
      { name: 'The Devil', meaning: 'Materialism, bondage, ignorance' },
      { name: 'The Tower', meaning: 'Disaster, upheaval, sudden change' },
      { name: 'The Star', meaning: 'Hope, inspiration, spirituality' },
      { name: 'The Moon', meaning: 'Illusion, fear, subconscious' },
      { name: 'The Sun', meaning: 'Success, joy, vitality' },
      { name: 'Judgement', meaning: 'Rebirth, inner calling, absolution' },
      { name: 'The World', meaning: 'Completion, fulfillment, wholeness' }
    ];

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
    expect(tarotDeck.some(card => card.name === response.body.tarotReading.past.split('.')[0].trim())).toBeTruthy();
    expect(tarotDeck.some(card => card.name === response.body.tarotReading.present.split('.')[0].trim())).toBeTruthy();
    expect(tarotDeck.some(card => card.name === response.body.tarotReading.future.split('.')[0].trim())).toBeTruthy();
  });
});

