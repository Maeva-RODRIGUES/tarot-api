// reviewsControllers.js

const Reviews = require('../models/reviewsModels'); 

const reviewsControllers = {
    // Récupérer tous les avis
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Reviews.find();
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Récupérer un avis spécifique par son ID
    getReviewById: async (req, res) => {
        try {
            const review = await Reviews.findById(req.params.id);
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Créer un nouvel avis
    createReview: async (req, res) => {
        try {
            const newReview = new Reviews(req.body);
            const savedReview = await newReview.save();
            res.status(201).json(savedReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Mettre à jour un avis par son ID
    updateReview: async (req, res) => {
        try {
            const updatedReview = await Reviews.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(updatedReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer un avis par son ID
    deleteReview: async (req, res) => {
        try {
            await Reviews.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Avis supprimé avec succès' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = reviewsControllers;
