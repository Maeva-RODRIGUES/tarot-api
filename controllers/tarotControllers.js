// Ce fichier contient la logique métier pour les tirages de tarot.
// tarotController.js

const tarotData = require('../tarotData.json');

// Fonction pour sélectionner une carte aléatoire dans le jeu de tarot
function drawRandomCard(tarotDeck) {
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    return tarotDeck[randomIndex];
}

// Fonction pour effectuer un tirage de tarot
exports.drawCards = async (req, res) => {
    try {
        // échantillon données 22 arcanes majeures
        const tarotDeck = tarotData;
        
        // Sélection aléatoire de trois cartes pour le passé, le présent et le futur
        const pastCard = drawRandomCard(tarotDeck);
        const presentCard = drawRandomCard(tarotDeck);
        const futureCard = drawRandomCard(tarotDeck);

        // Création de l'interprétation des cartes
        const tarotReading = {
            past: `You drew ${pastCard.name}. ${pastCard.meaning}`,
            present: `You drew ${presentCard.name}. ${presentCard.meaning}`,
            future: `You drew ${futureCard.name}. ${futureCard.meaning}`
        };

        // Envoyer la réponse au client
        res.json({ message: 'Tirage de tarot effectué avec succès', tarotReading });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur au client
        res.status(500).json({ message: 'Erreur lors du tirage de tarot', error });
    }
};

// Fonction pour effectuer un tirage de tarot aléatoire
exports.drawRandomCards = async (req, res) => {
    try {
        // échantillon données 22 arcanes majeures
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
