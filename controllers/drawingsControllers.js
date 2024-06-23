// drawingsController.js : logique métier des tirages de cartes

const { Card, Theme, Drawing } = require('../models/indexModels');
const themes = require('../db/themesMock');


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

// Fonction pour effectuer un tirage de tarot aléatoire basé sur le thème "Amour"
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

// Fonction pour mettre à jour un tirage spécifique par son ID
exports.updateDrawingById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedDrawing = await Drawing.update(req.body, {
            where: { id: id },
            returning: true, // Renvoyer le tirage mis à jour
        });

        if (updatedDrawing[0] === 1) {
            res.json({ message: 'Tirage mis à jour avec succès', updatedDrawing: updatedDrawing[1][0] });
        } else {
            res.status(404).send('Tirage non trouvé ou pas de changement effectué');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du tirage :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du tirage', error });
    }
};

// Fonction pour supprimer un tirage spécifique par son ID
exports.deleteDrawingById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedDrawing = await Drawing.destroy({
            where: { id: id }
        });
        if (deletedDrawing) {
            res.json({ message: 'Tirage supprimé avec succès' });
        } else {
            res.status(404).send('Tirage non trouvé');
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du tirage', error });
    }
};

// Fonction pour créer un nouveau tirage de tarot
exports.createDrawing = async (req, res) => {
    try {
      // Utilisez les données reçues dans la requête pour créer un tirage
      const newDrawing = await Drawing.create({
        date: req.body.date,
        cards: req.body.cards,
        id_Themes: req.body.id_Themes,
        id_Users: req.body.id_Users
      });
      // Renvoyez l'ID du nouveau tirage dans la réponse
      res.status(201).json({ id: newDrawing.id, ...newDrawing.get({ plain: true }) });
    } catch (error) {
      // Gérez les erreurs potentielles
      res.status(500).json({ message: 'Erreur lors de la création du tirage', error });
    }
  };

  