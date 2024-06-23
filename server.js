//server.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const portfinder = require('portfinder');
const { sequelize } = require('./models/indexModels');
const indexRoutes = require('./routes/indexRoutes');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();

const app = express();

// Middleware pour logger les requêtes HTTP
app.use(morgan('dev'));

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Middleware pour gérer les cookies
app.use(cookieParser());

// Middleware pour autoriser les requêtes depuis toutes les origines (CORS)
app.use(cors());

// Utilisation du routeur centralisé
app.use('/api/tarot', indexRoutes);

// Route de base pour afficher un message de bienvenue
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du tarot en ligne');
});

// Middleware d'erreur centralisé
app.use(errorHandler);

// Vérification de la connexion à la base de données et démarrage du serveur
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données établie avec succès.');
        return sequelize.sync(); // Synchronisation des modèles avec la base de données
    })
    .then(() => {
        // Recherche d'un port disponible avec portfinder
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
        console.error('Impossible de se connecter à la base de données :', err);
    });

// Export de l'application pour les tests ou autres utilisations
module.exports = app;