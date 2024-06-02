// interpretationsRoutes.js

const express = require('express');
const router = express.Router();
const interpretationsControllers = require('../controllers/interpretationsControllers');

// Route pour récupérer toutes les interprétations
router.get('/interpretations', interpretationsControllers.getAllInterpretations);

// Route pour récupérer une interprétation spécifique par son ID
router.get('/interpretations/:id', interpretationsControllers.getInterpretationById);

// Route pour créer une nouvelle interprétation
router.post('/interpretations', interpretationsControllers.createInterpretation);

// Route pour mettre à jour une interprétation par son ID
router.put('/interpretations/:id', interpretationsControllers.updateInterpretation);

// Route pour supprimer une interprétation par son ID
router.delete('/interpretations/:id', interpretationsControllers.deleteInterpretation);

module.exports = router;
