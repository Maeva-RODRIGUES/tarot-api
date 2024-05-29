// cardsController.js :  logique métier de la gestion des cartes

const { Card } = require('../models/indexModels');
const cardsData = require('../db/cards');


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

// Fonction pour créer une nouvelle carte
exports.createCard = async (req, res) => {
    try {
        const newCard = await Card.create({
            name_card: req.body.name_card,
            keyword1: req.body.keyword1,
            keyword2: req.body.keyword2,
            keyword3: req.body.keyword3,
            image_url: req.body.image_url,
        });
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la carte', error });
    }
};
