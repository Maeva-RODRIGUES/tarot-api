//server.js

// Importer la bibliothèque express
const express = require('express');
const morgan = require('morgan');
const app = express();
const tarotRoutes = require('./routes/tarotRoutes');

// Importer la configuration de la base de données
const dbConfig = require('./config/database');

// Importer Sequelize
const { Sequelize } = require('sequelize');

// Importer la bibliothèque portfinder
const portfinder = require('portfinder');

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Utilisation des routes pour les tirages de tarot
app.use('/api/tarot', tarotRoutes);

// Route de base pour afficher un message de bienvenue lorsque quelqu'un accède à la racine de l'API.
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du tarot en ligne');
});

// Créer une instance Sequelize avec la configuration de la base de données
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  logging: false // cette option désactive la journalisation des requêtes SQL (SELECT 1+1 AS result)
});


// Utiliser portfinder pour obtenir un port disponible automatiquement
portfinder.getPortPromise()
  .then((port) => {
    // Établir la connexion à la base de données
    sequelize.authenticate()
      .then(() => {
        // console.log('Connexion à la base de données établie avec succès.');

        // Démarrer le serveur sur le port obtenu
        app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
        });
      })
      .catch(err => {
         console.error('Impossible de se connecter à la base de données:', err);
      });
  })
  .catch((err) => {
    console.error('Erreur lors de la recherche du port disponible :', err);
  })

  module.exports = app; 