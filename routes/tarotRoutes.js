// Contient les routes de l'API pour les opérations de tirage de tarot.
// tarotRoutes.js

const express = require('express');
const router = express.Router();
const tarotController = require('../controllers/tarotControllers');

// Route pour effectuer un tirage de tarot
router.get('/draw', tarotController.drawCards);

module.exports = router;
