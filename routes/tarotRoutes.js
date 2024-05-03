// Ce fichier appellera les fonctions défnies ici pour traiter les requêtes
// tarotRoutes.js

const express = require('express');
const router = express.Router();
const tarotController = require('../controllers/tarotController');

// Route pour récupérer la signification d'une carte spécifique
router.get('/cards/:cardName', tarotController.getCardMeaning);

// Ajoutez d'autres routes pour les fonctionnalités supplémentaires ici

module.exports = router;