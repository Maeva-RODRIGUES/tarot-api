// interpretationsRoutes.js

const express = require('express');
const router = express.Router();
const interpretationsControllers = require('../controllers/interpretationsControllers');

// Route pour récupérer toutes les interprétations
router.get('/', interpretationsControllers.getAllInterpretations);

// Route pour récupérer une interprétation spécifique par son ID
router.get('/:id', interpretationsControllers.getInterpretationById);

// Route pour créer une nouvelle interprétation
router.post('/', interpretationsControllers.createInterpretation);

// Route pour mettre à jour une interprétation par son ID
router.put('/:id', interpretationsControllers.updateInterpretation);

// Route pour supprimer une interprétation par son ID
router.delete('/:id', interpretationsControllers.deleteInterpretation);

module.exports = router;
