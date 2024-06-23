// interpretationsControllers.js

const { Interpretation } = require('../models/interpretationsModels');

const interpretationsControllers = {
    // Récupérer toutes les interprétations
    getAllInterpretations: async (req, res) => {
        try {
            const interpretations = await Interpretation.findAll();
            res.status(200).json(interpretations);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des interprétations', error });
        }
    },

    // Récupérer une interprétation spécifique par son ID
    getInterpretationById: async (req, res) => {
        const id = req.params.id;
        try {
            const interpretation = await Interpretation.findByPk(id);
            if (!interpretation) {
                return res.status(404).json({ message: 'Interprétation non trouvée' });
            }
            res.status(200).json(interpretation);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération de l\'interprétation', error });
        }
    },

    // Créer une nouvelle interprétation
    createInterpretation: async (req, res) => {
        try {
            const newInterpretation = await Interpretation.create(req.body);
            res.status(201).json(newInterpretation);
        } catch (error) {
            res.status(400).json({ message: 'Erreur lors de la création de l\'interprétation', error });
        }
    },

    // Mettre à jour une interprétation par son ID
    updateInterpretation: async (req, res) => {
        const id = req.params.id;
        try {
            const [updatedCount, updatedInterpretations] = await Interpretation.update(req.body, {
                where: { id: id },
                returning: true, // pour retourner les données mises à jour
            });
            if (updatedCount > 0) {
                res.json({ message: 'Interprétation mise à jour avec succès', updatedInterpretations });
            } else {
                res.status(404).send('Interprétation non trouvée ou pas de changement effectué');
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'interprétation', error });
        }
    },

    // Supprimer une interprétation par son ID
    deleteInterpretation: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedCount = await Interpretation.destroy({
                where: { id: id }
            });
            if (deletedCount > 0) {
                res.json({ message: 'Interprétation supprimée avec succès' });
            } else {
                res.status(404).send('Interprétation non trouvée');
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'interprétation', error });
        }
    }
};

module.exports = interpretationsControllers;