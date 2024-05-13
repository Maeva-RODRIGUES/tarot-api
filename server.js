// Intégrer la librairie express dans notre fichier server.js
const express = require('express');
const app = express();
const tarotRoutes = require('./routes/tarotRoutes');

// Importer la configuration de la base de données
const dbConfig = require('./config/database');

// Importer Sequelize
const { Sequelize } = require('sequelize');

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
  port: dbConfig.port
});

// Établir la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

// Port d'écoute du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});



