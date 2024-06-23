// Centralise et organise les importations des routes.
//indexRoutes.js

const express = require('express');
const router = express.Router();

const cardsRoutes = require('./cardsRoutes'); 
const themesRoutes = require('./themesRoutes'); 
const drawingsRoutes = require ('./drawingsRoutes');
const interpretationsRoutes = require ('./interpretationsRoutes');
const reviewsRoutes = require ('./reviewsRoutes');
const usersRoutes = require ('./usersRoutes');
const rolesRoutes = require ('./rolesRoutes');



// Monter les routes spécifiques sur le routeur principal
router.use('/cards', cardsRoutes);
router.use('/themes', themesRoutes);
router.use('/drawings', drawingsRoutes);
router.use('/interpretations', interpretationsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/users', usersRoutes);
router.use('/roles', rolesRoutes);

module.exports = router;