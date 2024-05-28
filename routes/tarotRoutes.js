//Fichier de routes dédié pour gérer les données de cards.js
// tarotRoutes.js

const express = require('express');
const router = express.Router();
const cardsData = require('../db/cards');

// Route pour récupérer toutes les cartes du tarot
router.get('/cards', (req, res) => {
    res.json(cardsData);
});

// Route pour récupérer une carte spécifique par son ID
router.get('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const card = cardsData.find(card => card.id === id);
    if (card) {
        res.json(card);
    } else {
        res.status(404).send('Carte non trouvée');
    }
});

module.exports = router;
