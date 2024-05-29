// cardsController.js :  logique métier de la gestion des cartes

const { Card } = require('../models/indexModels');


// Fonction pour récupérer toutes les cartes du tarot
exports.getAllCards = (req, res) => {
    res.json(cardsData);
};

// Fonction pour récupérer une carte spécifique par son ID
exports.getCardById = (req, res) => {
    const id = parseInt(req.params.id);
    const card = cardsData.find(card => card.id === id);
    if (card) {
        res.json(card);
    } else {
        res.status(404).send('Carte non trouvée');
    }
};
