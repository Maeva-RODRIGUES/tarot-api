// cardsController.js :  logique métier de la gestion des cartes

const { Card } = require('../models/indexModels');
const cardsData = require('../db/cardsMock');


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

// Fonction pour mettre à jour une carte spécifique par son ID
exports.updateCardById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCard = await Card.update(req.body, {
            where: { id: id }
        });
        if (updatedCard) {
            res.json({ message: 'Carte mise à jour avec succès', updatedCard });
        } else {
            res.status(404).send('Carte non trouvée ou pas de changement effectué');
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la carte', error });
    }
};

// Fonction pour supprimer une carte spécifique par son ID
exports.deleteCardById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCard = await Card.destroy({
            where: { id: id }
        });
        if (deletedCard) {
            res.json({ message: 'Carte supprimée avec succès' });
        } else {
            res.status(404).send('Carte non trouvée');
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la carte', error });
    }
};
