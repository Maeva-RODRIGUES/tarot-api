// Ce fichier contient la logique métier pour les tirages de tarot.
// tarotController.js

const db = require('../database');

// Fonction pour récupérer la signification d'une carte spécifique
exports.getCardMeaning = (req, res) => {
    const cardName = req.params.cardName;
    const sql = 'SELECT * FROM tarot_cards WHERE name = ?';
    db.query(sql, [cardName], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération de la signification de la carte : ', err);
            return res.status(500).json({ message: 'Erreur lors de la récupération de la signification de la carte' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Carte non trouvée' });
        }
        return res.status(200).json({ card: result[0] });
    });
};