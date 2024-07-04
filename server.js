//server.js

require('dotenv').config();


const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

console.log('DB_USERNAME:', DB_USERNAME); 
console.log('DB_PASSWORD:', DB_PASSWORD);




const { sequelize } = require('./models/indexModels');

const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');
const cookieParser = require('cookie-parser');
const portfinder = require('portfinder');
const helmet = require('helmet'); // Middleware pour sécuriser les applications Express
const rateLimit = require('express-rate-limit');// Middleware pour limiter le taux de requêtes
// const csrfProtection = require('./middlewares/csrfMiddleware');

const app = express();
const indexRoutes = require('./routes/indexRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Middleware pour sécuriser l'application Express
app.use(helmet()); // Utilisation de Helmet pour configurer divers en-têtes HTTP sécurisés
app.use(express.json()); // Middleware pour parser les données JSON des requêtes
app.use(morgan('dev')); // Logging détaillé des requêtes HTTP dans la console (environnement de développement)
app.use(cookieParser()); // Middleware pour parser les cookies des requêtes


// Configuration CORS
// const corsOptions = {
//     origin: ['https://yourtrusteddomain.com'], // Domaines de confiance
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   };
//   app.use(cors(corsOptions)); // Utilisation de CORS avec les options configurées


// Limitation du taux de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par windowMs
});
app.use(limiter);

// Redirection vers HTTPS en production
// if (process.env.NODE_ENV === 'production') {
//     app.use((req, res, next) => {
//         if (req.header('x-forwarded-proto') !== 'https') {
//             res.redirect(`https://${req.header('host')}${req.url}`);
//         } else {
//             next();
//         }
//     });
// }

// Utilisation du middleware CSRF
// app.use(csrfProtection);

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


module.exports = app;