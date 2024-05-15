// tarotController.js

const tarotData = require('../tarotData.json');
const themeData = require('../themeData.json');

// Fonction drawRandomCard pour sélectionner une carte aléatoire dans le jeu de tarot
function drawRandomCard(tarotDeck) {
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    return tarotDeck[randomIndex];
}

// Fonction drawCards pour effectuer un tirage de tarot
exports.drawCards = async (req, res) => {
    try {
        const tarotDeck = tarotData;
        
        // Sélection aléatoire de trois cartes
        const pastCard = drawRandomCard(tarotDeck);
        const presentCard = drawRandomCard(tarotDeck);
        const futureCard = drawRandomCard(tarotDeck);

        // Envoyer la réponse au client avec les cartes tirées
        res.json({ message: 'Tirage de tarot effectué avec succès', cards: [pastCard, presentCard, futureCard] });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur au client
        res.status(500).json({ message: 'Erreur lors du tirage de tarot', error });
    }
};

// Fonction pour effectuer un tirage de tarot aléatoire
exports.drawRandomCards = async (req, res) => {
    try {
        const tarotDeck = tarotData;
        
        // Sélection aléatoire d'une carte
        const randomCard = drawRandomCard(tarotDeck);

        // Envoyer la réponse au client avec la carte tirée
        res.json({ message: 'Tirage de tarot aléatoire effectué avec succès', card: randomCard });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur au client
        res.status(500).json({ message: 'Erreur lors du tirage de tarot aléatoire', error });
    }
};

// Fonction drawThemeCards pour effectuer un tirage de tarot en fonction du thème choisi
exports.drawThemeCards = async (req, res) => {
    try {
        const tarotDeck = tarotData;
        const theme = req.params.theme;

        // Vérifier si le thème choisi est valide
        if (!(theme in themeData)) {
            return res.status(400).json({ message: "Thème invalide" });
        }

        // Sélection aléatoire d'une carte associée au thème choisi
        const themeCardsNames = themeData[theme];
        const randomIndex = Math.floor(Math.random() * themeCardsNames.length);
        const randomCardName = themeCardsNames[randomIndex];

        // Rechercher la carte dans le jeu de tarot
        const randomCard = tarotDeck.find(card => card.name === randomCardName);

        // Envoyer la réponse au client avec la carte tirée pour le thème choisi
        res.json({ message: `Tirage de tarot pour le thème ${theme} effectué avec succès`, cards: [randomCard] });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur au client
        res.status(500).json({ message: 'Erreur lors du tirage de tarot pour le thème choisi', error });
    }
};
