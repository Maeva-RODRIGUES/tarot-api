// themesControllers.js

const { Theme } = require('../models/indexModels');

const themesControllers = {
    // Récupérer tous les thèmes
    getAllThemes: async (req, res) => {
        try {
            const themes = await Theme.findAll();
            res.status(200).json(themes);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des thèmes', error });
        }
    },

    // Récupérer un thème spécifique par son ID
    getThemeById: async (req, res) => {
        const id = req.params.id;
        try {
            const theme = await Theme.findByPk(id);
            if (!theme) {
                return res.status(404).json({ message: 'Thème non trouvé' });
            }
            res.status(200).json(theme);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération du thème', error });
        }
    },

    // Créer un nouveau thème
    createTheme: async (req, res) => {
        try {
            const newTheme = await Theme.create(req.body);
            res.status(201).json(newTheme);
        } catch (error) {
            res.status(400).json({ message: 'Erreur lors de la création du thème', error });
        }
    },

    // Mettre à jour un thème par son ID
    updateTheme: async (req, res) => {
        const id = req.params.id;
        try {
            const [updatedCount, updatedThemes] = await Theme.update(req.body, {
                where: { id: id },
                returning: true, // pour retourner les données mises à jour
            });
            if (updatedCount > 0) {
                res.json({ message: 'Thème mis à jour avec succès', updatedThemes });
            } else {
                res.status(404).send('Thème non trouvé ou pas de changement effectué');
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour du thème', error });
        }
    },

    // Supprimer un thème par son ID
    deleteTheme: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedCount = await Theme.destroy({
                where: { id: id }
            });
            if (deletedCount > 0) {
                res.json({ message: 'Thème supprimé avec succès' });
            } else {
                res.status(404).send('Thème non trouvé');
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression du thème', error });
        }
    }
};

module.exports = themesControllers;
