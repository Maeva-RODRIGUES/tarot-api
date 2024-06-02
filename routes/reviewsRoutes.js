// reviewsRoutes.js

const express = require('express');
const router = express.Router();
const reviewsControllers = require('../controllers/reviewsControllers');

// Route pour récupérer tous les avis
router.get('/reviews', reviewsControllers.getAllReviews);

// Route pour récupérer un avis spécifique par son ID
router.get('/reviews/:id', reviewsControllers.getReviewById);

// Route pour créer un nouvel avis
router.post('/reviews', reviewsControllers.createReview);

// Route pour mettre à jour un avis par son ID
router.put('/reviews/:id', reviewsControllers.updateReview);

// Route pour supprimer un avis par son ID
router.delete('/reviews/:id', reviewsControllers.deleteReview);

module.exports = router;

