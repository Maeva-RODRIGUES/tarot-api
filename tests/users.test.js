// users.test.js

const request = require('supertest');
const app = require('../server');

describe('Tests pour les routes des utilisateurs', () => {
    let userId; // Variable pour stocker l'ID de l'utilisateur créé pour les tests suivants
  
    // Test pour récupérer tous les utilisateurs
    it('GET /users renvoie tous les utilisateurs', async () => {
      const response = await request(app).get('/users');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  
    // Test pour créer un nouvel utilisateur
    it('POST /users crée un nouvel utilisateur', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      const response = await request(app).post('/users').send(newUser);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      userId = response.body.id; // Stockez l'ID pour les tests suivants
    });
  
    // Test pour récupérer un utilisateur par son ID
    it('GET /users/:id renvoie un utilisateur spécifique', async () => {
      const response = await request(app).get(`/users/${userId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
    });
  
    // Test pour mettre à jour un utilisateur par son ID
    it('PUT /users/:id met à jour un utilisateur', async () => {
      const updatedUser = {
        username: 'updateduser',
        email: 'updated@example.com'
      };
      const response = await request(app).put(`/users/${userId}`).send(updatedUser);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('username', 'updateduser');
    });
  
    // Test pour supprimer un utilisateur par son ID
    it('DELETE /users/:id supprime un utilisateur', async () => {
      const response = await request(app).delete(`/users/${userId}`);
      expect(response.statusCode).toBe(204);
    });
  });