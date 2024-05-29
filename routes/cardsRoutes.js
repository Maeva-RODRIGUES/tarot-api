//Fichier de routes dédié pour gérer les données de cards.js
// tarotRoutes.js

const express = require('express');
const router = express.Router();
const tarotControllers = require('../controllers/cardsControllers');

// Route pour récupérer toutes les cartes du tarot
router.get('/cards', tarotControllers.getAllCards);

// Route pour récupérer une carte spécifique par son ID
router.get('/cards/:id', tarotControllers.getCardById);


module.exports = router;
