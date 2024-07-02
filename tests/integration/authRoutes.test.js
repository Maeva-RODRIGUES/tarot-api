// authRoutes.test.js

const request = require('supertest');
const app = require('../../server'); // Assurez-vous que ce chemin mène à votre fichier principal de l'application Express

describe('Auth Routes', () => {
    let token; // Variable pour stocker le jeton JWT
  
    describe('POST /api/tarot/auth/login', () => {
      it('devrait authentifier l\'utilisateur et renvoyer un jeton JWT', async () => {
        // Les identifiants de l'utilisateur pour le test
        const userCredentials = {
          username: 'testuser',
          password: 'testpassword'
        };
  
        // Faites une requête POST à la route de connexion
        const response = await request(app)
          .post('/api/tarot/auth/login')
          .send(userCredentials);
  
        // Vérifiez que la réponse a un statut 200 OK
        expect(response.statusCode).toBe(200);
  
        // Vérifiez que la réponse contient un jeton JWT
        expect(response.body).toHaveProperty('token');
        token = response.body.token; // Stockez le jeton JWT pour l'utiliser dans les tests suivants
  
        // Assurez-vous que le jeton est une chaîne non vide
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        expect(token.length).toBeGreaterThan(0);
      });
  
      it('devrait renvoyer une erreur 401 si les identifiants sont incorrects', async () => {
        // Identifiants incorrects pour le test
        const wrongCredentials = {
          username: 'wronguser',
          password: 'wrongpassword'
        };
  
        // Faites une requête POST à la route de connexion avec des identifiants incorrects
        const response = await request(app)
          .post('/api/tarot/auth/login')
          .send(wrongCredentials);
  
        // Vérifiez que la réponse a un statut 401 Unauthorized
        expect(response.statusCode).toBe(401);
  
        // Vérifiez que la réponse contient le message d'erreur approprié
        expect(response.body).toHaveProperty('message', 'Identifiants incorrects');
      });
    });
  
  });