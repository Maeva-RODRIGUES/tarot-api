// themesControllers.js

const Theme = require('../models/themesModels'); 

const themesControllers = {
    // Récupérer tous les thèmes
    getAllThemes: async (req, res) => {
        try {
            const themes = await Theme.find();
            res.status(200).json(themes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Récupérer un thème spécifique par son ID
    getThemeById: async (req, res) => {
        try {
            const theme = await Theme.findById(req.params.id);
            if (!theme) {
                return res.status(404).json({ message: 'Thème non trouvé' });
            }
            res.status(200).json(theme);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Créer un nouveau thème
    createTheme: async (req, res) => {
        try {
            const newTheme = new Theme(req.body);
            const savedTheme = await newTheme.save();
            res.status(201).json(savedTheme);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Mettre à jour un thème par son ID
    updateTheme: async (req, res) => {
        try {
            const updatedTheme = await Theme.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedTheme) {
                return res.status(404).json({ message: 'Thème non trouvé' });
            }
            res.status(200).json(updatedTheme);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer un thème par son ID
    deleteTheme: async (req, res) => {
        try {
            const deletedTheme = await Theme.findByIdAndDelete(req.params.id);
            if (!deletedTheme) {
                return res.status(404).json({ message: 'Thème non trouvé' });
            }
            res.status(200).json({ message: 'Thème supprimé avec succès' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = themesControllers;
