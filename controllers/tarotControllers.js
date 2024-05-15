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
        const themeInterpretation = themeData["love"].interpretation;
        
        // Sélection aléatoire de 3 cartes uniques
        const randomCards = []
        for (let index = 0; index < 3; index++) {
            const randomCard = drawRandomCard(tarotDeck);
            randomCards.push(randomCard)
        }
        
        // Envoyer la réponse au client avec la carte tirée
        res.json({ message: 'Tirage de tarot aléatoire effectué avec succès', cards: randomCards, interpretation:  themeInterpretation});
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur au client
        res.status(500).json({ message: 'Erreur lors du tirage de tarot aléatoire', error });
    }
};

// Fonction drawThemeCards pour effectuer un tirage de tarot en fonction du thème choisi
exports.drawThemeCards = async (req, res) => {
    try {
        const theme = req.params.theme;

        // Vérifier si le thème choisi est valide
        if (!(theme in themeData)) {
            return res.status(400).json({ message: "Thème invalide" });
        }

        const themeCardsNames = themeData[theme].cards;
        const themeInterpretation = themeData[theme].interpretation;
        const tarotDeck = tarotData;

    // Sélection aléatoire de trois cartes associées au thème choisi
    const randomCards = [];
    while (randomCards.length < 3) {
        const randomIndex = Math.floor(Math.random() * themeCardsNames.length);
        const randomCardName = themeCardsNames[randomIndex];
        const randomCard = tarotDeck.find(card => card.name === randomCardName);
        // Vérifier si la carte tirée n'est pas déjà dans randomCards
        if (!randomCards.some(card => card.name === randomCard.name)) {
            randomCards.push(randomCard);
        }
    }

        console.log(randomCards)
        // Envoyer la réponse au client avec les cartes tirées et leur interprétation
        res.json({ message: `Tirage de tarot pour le thème ${theme} effectué avec succès`, cards: randomCards, interpretation: themeInterpretation });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur au client
        res.status(500).json({ message: 'Erreur lors du tirage de tarot pour le thème choisi', error });
    }
};
