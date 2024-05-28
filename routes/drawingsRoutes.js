// Contient les routes de l'API pour les opérations de tirage de tarot.
// drawingsRoutes.js

const express = require ('express');
const router = express.Router();
const tarotController = require('../controllers/drawingsControllers');

// Route pour effectuer un tirage de tarot
router.get('/draw', tarotController.drawCards);

// Route pour effectuer un tirage de tarot aléatoire
router.get('/draw-random', tarotController.drawRandomCards);

// Route pour gérer le tirage de cartes en fonction du thème choisi :
router.get('/draw-theme/:theme', tarotController.drawThemeCards);



module.exports = router;
