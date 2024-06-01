// drawingsController.js : logique métier des tirages de cartes

const { Card, Theme, Drawing } = require('../models/indexModels');


// Fonction drawRandomCard pour sélectionner une carte aléatoire dans le jeu de tarot
function drawRandomCard(tarotDeck) {
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    return tarotDeck[randomIndex];
}

// Fonction drawCards pour effectuer un tirage de tarot
exports.drawCards = async (req, res) => {
    try {
        const tarotDeck = cardsData;
        
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

// Fonction pour effectuer un tirage de tarot aléatoire basé sur le thème "love"
exports.drawRandomCards = async (req, res) => {
    try {
        const themeName = "Amour"; // Le thème "Amour"
        const theme = themes.find(t => t.title_theme === themeName);

        if (!theme) {
            return res.status(400).json({ message: "Thème 'Amour' non trouvé" });
        }

        const tarotDeck = cardsData.filter(card => theme.meaning_theme.includes(card.name));

        // Sélection aléatoire de trois cartes
        const randomCards = [];
        while (randomCards.length < 3) {
            const randomCard = drawRandomCard(tarotDeck);
            if (!randomCards.some(card => card.name === randomCard.name)) {
                randomCards.push(randomCard);
            }
        }

        // Envoyer la réponse au client avec les cartes tirées du thème "Amour"
        res.json({ message: 'Tirage de tarot aléatoire effectué avec succès', cards: randomCards, interpretation: theme.meaning_theme });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur au client
        res.status(500).json({ message: 'Erreur lors du tirage de tarot aléatoire', error });
    }
};

// Fonction drawThemeCards pour effectuer un tirage de tarot en fonction du thème choisi
exports.drawThemeCards = async (req, res) => {
    try {
        const themeName = req.params.theme;

        const theme = themes.find(t => t.title_theme === themeName);

        // Vérifier si le thème choisi est valide
        if (!theme) {
            return res.status(400).json({ message: "Thème invalide" });
        }

        const tarotDeck = cardsData.filter(card => theme.meaning_theme.includes(card.name));

        // Sélection aléatoire de trois cartes associées au thème choisi
        const randomCards = [];
        while (randomCards.length < 3) {
            const randomCard = drawRandomCard(tarotDeck);
            if (!randomCards.some(card => card.name === randomCard.name)) {
                randomCards.push(randomCard);
            }
        }

        // Envoyer la réponse au client avec les cartes tirées et leur interprétation
        res.json({ message: `Tirage de tarot pour le thème ${themeName} effectué avec succès`, cards: randomCards, interpretation: theme.meaning_theme });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur au client
        res.status(500).json({ message: 'Erreur lors du tirage de tarot pour le thème choisi', error });
    }
};



    

   