// Ce fichier contient la logique métier pour les tirages de tarot.
// tarotController.js

// Fonction pour effectuer un tirage de tarot
exports.drawCards = async (req, res) => {
    try {
        // échantillon données 22 arcanes majeures
        const tarotDeck = [
            { name: 'The Fool', meaning: 'Beginnings, innocence, spontaneity' },
            { name: 'The Magician', meaning: 'Manifestation, resourcefulness, power' },
            { name: 'The High Priestess', meaning: 'Intuition, unconscious, mystery' },
            { name: 'The Empress', meaning: 'Fertility, nurturing, abundance' },
            { name: 'The Emperor', meaning: 'Authority, structure, control' },
            { name: 'The Hierophant', meaning: 'Tradition, conformity, morality' },
            { name: 'The Lovers', meaning: 'Partnerships, duality, union' },
            { name: 'The Chariot', meaning: 'Willpower, determination, victory' },
            { name: 'Strength', meaning: 'Courage, inner strength, compassion' },
            { name: 'The Hermit', meaning: 'Soul-searching, introspection, solitude' },
            { name: 'Wheel of Fortune', meaning: 'Change, cycles, destiny' },
            { name: 'Justice', meaning: 'Fairness, balance, truth' },
            { name: 'The Hanged Man', meaning: 'Sacrifice, release, suspension' },
            { name: 'Death', meaning: 'Endings, transformation, new beginnings' },
            { name: 'Temperance', meaning: 'Balance, moderation, patience' },
            { name: 'The Devil', meaning: 'Materialism, bondage, ignorance' },
            { name: 'The Tower', meaning: 'Disaster, upheaval, sudden change' },
            { name: 'The Star', meaning: 'Hope, inspiration, spirituality' },
            { name: 'The Moon', meaning: 'Illusion, fear, subconscious' },
            { name: 'The Sun', meaning: 'Success, joy, vitality' },
            { name: 'Judgement', meaning: 'Rebirth, inner calling, absolution' },
            { name: 'The World', meaning: 'Completion, fulfillment, wholeness' }
        ];
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

// Fonction pour tirer une carte aléatoire à partir du jeu de tarot
function drawRandomCard(deck) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    return deck[randomIndex];
}
