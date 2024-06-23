// Centralise et organise les importations des routes.
//indexRoutes.js

const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { protect, authorize } = require('../middlewares/auth'); // Importer les middlewares protect et authorize
const errorHandler = require('../middlewares/errorHandler'); // Importer le middleware errorHandler


// Utiliser le middleware cookie-parser pour gérer les cookies
router.use(cookieParser());

// Importer les routes spécifiques
const cardsRoutes = require('./cardsRoutes'); 
const themesRoutes = require('./themesRoutes'); 
const drawingsRoutes = require ('./drawingsRoutes');
const interpretationsRoutes = require ('./interpretationsRoutes');
const reviewsRoutes = require ('./reviewsRoutes');
const usersRoutes = require ('./usersRoutes');
const rolesRoutes = require ('./rolesRoutes');


// Monter les routes spécifiques sur le routeur principal
router.use('/cards', protect, cardsRoutes);
router.use('/themes', protect, themesRoutes);
router.use('/drawings', protect, drawingsRoutes);
router.use('/interpretations', protect, interpretationsRoutes);
router.use('/reviews', protect, reviewsRoutes);
router.use('/users', protect, authorize(['admin']), usersRoutes);
router.use('/roles', protect, authorize(['admin']), rolesRoutes);

// Route pour gérer le consentement aux cookies
router.post('/consent', (req, res) => {
    const { consent } = req.body;

    // Enregistrer le consentement dans un cookie nommé 'consentCookie'
    res.cookie('consentCookie', consent, {
        maxAge: 365 * 24 * 60 * 60 * 1000, // Durée de validité d'un an (optionnel)
        httpOnly: true, // Rend le cookie accessible uniquement par le serveur
        secure: true // Requiert une connexion HTTPS pour envoyer le cookie
    });

    res.send('Consentement enregistré avec succès');
});

// Route pour lire un cookie
router.get('/user', (req, res) => {
    const consent = req.cookies.consentCookie;

    if (consent === 'accepted') {
        res.send('Contenu accessible car le consentement est accepté');
    } else {
        res.send('Vous devez donner votre consentement pour accéder à ce contenu');
    }
});

// Middleware pour gérer les erreurs
router.use(errorHandler);

module.exports = router;