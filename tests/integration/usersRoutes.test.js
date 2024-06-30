// usersRoutes.test.js

const request = require('supertest');
const app = require('../../server');

describe('Tests pour les routes des utilisateurs', () => {
    let userId; // Variable pour stocker l'ID de l'utilisateur créé pour les tests suivants
  
// Test pour récupérer tous les utilisateurs
it('GET /api/tarot/users renvoie tous les utilisateurs', async () => {
  // Effectue une requête GET asynchrone à l'endpoint '/api/tarot/users'
  // en utilisant la fonction 'request' de supertest et l'application Express 'app'.
  const response = await request(app).get('/api/tarot/users');

  // Vérifie que le code de statut de la réponse HTTP est 200, ce qui indique
  // que la requête a été traitée avec succès et que la réponse est valide.
  expect(response.statusCode).toBe(200);

  // Vérifie que le corps de la réponse (response.body) est un tableau (array).
  // Cela est important car l'endpoint est censé renvoyer une liste d'utilisateurs,
  // et en JSON, une liste est représentée par un tableau.
  expect(Array.isArray(response.body)).toBeTruthy();
});


  
    // Test pour créer un nouvel utilisateur
    it('POST /api/tarot/users crée un nouvel utilisateur', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      const response = await request(app).post('/api/tarot/users').send(newUser);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      userId = response.body.id; // Stockez l'ID pour les tests suivants
    });
  
    // Test pour récupérer un utilisateur par son ID
    it('GET /api/tarot/users/:id renvoie un utilisateur spécifique', async () => {
      const response = await request(app).get(`/api/tarot/users/${userId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
    });
  
    // Test pour mettre à jour un utilisateur par son ID
    it('PUT /api/tarot/users/:id met à jour un utilisateur', async () => {
      const updatedUser = {
        username: 'updateduser',
        email: 'updated@example.com'
      };
      const response = await request(app).put(`/api/tarot/users/${userId}`).send(updatedUser);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('username', 'updateduser');
    });
  
    // Test pour supprimer un utilisateur par son ID
    it('DELETE /api/tarot/users/:id supprime un utilisateur', async () => {
      const response = await request(app).delete(`/api/tarot/users/${userId}`);
      expect(response.statusCode).toBe(204);
    });
});