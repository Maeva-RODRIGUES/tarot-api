// Contient les routes de l'API pour les opérations de tirage de tarot.
// tarotRoutes.js

const express = require ('express');
const router = express.Router();
const tarotController = require('../controllers/tarotControllers');

// Route pour effectuer un tirage de tarot
router.get('/draw', tarotController.drawCards);

// Route pour effectuer un tirage de tarot aléatoire
router.get('/draw-random', tarotController.drawRandomCards);

// Route pour gérer le tirage de cartes en fonction du thème choisi :
router.get('/draw-theme/:theme', tarotController.drawThemeCards);

// Route pour effectuer un tirage aléatoire de tarot en fonction du thème choisi
//router.get('/draw-theme-random/:theme', tarotController.drawRandomThemeCards);


module.exports = router;
