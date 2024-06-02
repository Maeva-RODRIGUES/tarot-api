// interpretationsControllers.js

const Interpretation = require('../models/interpretationsModels');

const interpretationsControllers = {
    // Récupérer toutes les interprétations
    getAllInterpretations: async (req, res) => {
        try {
            const interpretations = await Interpretation.find();
            res.status(200).json(interpretations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Récupérer une interprétation spécifique par son ID
    getInterpretationById: async (req, res) => {
        try {
            const interpretation = await Interpretation.findById(req.params.id);
            if (!interpretation) {
                return res.status(404).json({ message: 'Interprétation non trouvée' });
            }
            res.status(200).json(interpretation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Créer une nouvelle interprétation
    createInterpretation: async (req, res) => {
        try {
            const newInterpretation = new Interpretation(req.body);
            const savedInterpretation = await newInterpretation.save();
            res.status(201).json(savedInterpretation);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Mettre à jour une interprétation par son ID
    updateInterpretation: async (req, res) => {
        try {
            const updatedInterpretation = await Interpretation.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedInterpretation) {
                return res.status(404).json({ message: 'Interprétation non trouvée' });
            }
            res.status(200).json(updatedInterpretation);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer une interprétation par son ID
    deleteInterpretation: async (req, res) => {
        try {
            const deletedInterpretation = await Interpretation.findByIdAndDelete(req.params.id);
            if (!deletedInterpretation) {
                return res.status(404).json({ message: 'Interprétation non trouvée' });
            }
            res.status(200).json({ message: 'Interprétation supprimée avec succès' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = interpretationsControllers;
