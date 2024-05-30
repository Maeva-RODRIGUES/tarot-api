//server.js

// Importer la bibliothèque express
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const drawingsRoutes = require('./routes/drawingsRoutes');
const cardsRoutes = require('./routes/cardsRoutes');
const portfinder = require('portfinder');

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Configurer CORS pour permettre les requêtes depuis toutes les origines
app.use(cors());

// Utilisation des routes pour gérer les données du fichier cards.js
app.use('/api/tarot', cardsRoutes);

// Utilisation des routes pour les tirages de tarot
app.use('/api/tarot', drawingsRoutes);

// Route de base pour afficher un message de bienvenue lorsque quelqu'un accède à la racine de l'API.
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du tarot en ligne');
});

// Importer l'instance Sequelize configurée depuis sequelizesetup.js
const sequelize = require('./db/sequelizeSetUp');

// Utiliser l'instance Sequelize pour authentifier la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    // Utiliser portfinder pour obtenir un port disponible automatiquement
    portfinder.getPortPromise()
      .then((port) => {
        // Démarrer le serveur sur le port obtenu
        app.listen(port, () => {
          console.log(`Serveur démarré sur le port ${port}`);
        });
      })
      .catch((err) => {
        console.error('Erreur lors de la recherche du port disponible :', err);
      });
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

module.exports = app;
