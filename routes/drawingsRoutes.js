// Contient les routes de l'API pour les opérations de tirage de tarot.
// drawingsRoutes.js

const express = require ('express');
const router = express.Router();
const drawingsControllers = require('../controllers/drawingsControllers'); 

// Route pour effectuer un tirage de tarot
router.get('/', drawingsControllers.drawCards);

// Route pour effectuer un tirage de tarot aléatoire
router.get('/random', drawingsControllers.drawRandomCards);

// Route pour gérer le tirage de cartes en fonction du thème choisi :
router.get('/theme/:theme', drawingsControllers.drawThemeCards);

router.post('/', drawingsControllers.createDrawing);

// Route pour mettre à jour un tirage spécifique par son ID
router.put('/:id', drawingsControllers.updateDrawingById);

// Route pour supprimer un tirage spécifique par son ID
router.delete('/:id', drawingsControllers.deleteDrawingById);


module.exports = router;
