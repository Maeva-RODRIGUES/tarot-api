//server.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const portfinder = require('portfinder');
require('dotenv').config();
const app = express();

// Importation des routeurs
const drawingsRoutes = require('./routes/drawingsRoutes');
const cardsRoutes = require('./routes/cardsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const rolesRoutes = require('./routes/rolesRoutes');

// Middleware pour traiter les requêtes JSON et logger les requêtes HTTP
app.use(express.json());
app.use(morgan('dev'));

// Configurer CORS pour permettre les requêtes depuis toutes les origines
app.use(cors());

// Utilisation des routeurs
app.use('/api/tarot', cardsRoutes);
app.use('/api/tarot', drawingsRoutes);
app.use('/api/tarot', usersRoutes);
app.use('/api/tarot', rolesRoutes);

// Route de base pour afficher un message de bienvenue
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du tarot en ligne');
});

// Importer l'instance Sequelize configurée
const sequelize = require('./db/sequelizeSetUp');

// Synchronisation de la base de données et démarrage du serveur
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    // Utiliser portfinder pour trouver un port libre
    portfinder.getPortPromise()
      .then((port) => {
        app.listen(port, () => {
          console.log(`Serveur démarré sur le port ${port}`);
        });
      })
      .catch((error) => {
        console.error('Erreur lors de la recherche d\'un port libre :', error);
      });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Middleware d'erreur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
