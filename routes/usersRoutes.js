// usersRoutes.js

const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');

// Route pour récupérer tous les utilisateurs
router.get('/users', usersControllers.getAllUsers);

// Route pour récupérer un utilisateur spécifique par son ID
router.get('/users/:id', usersControllers.getUserById);

// Route pour créer un nouvel utilisateur
router.post('/users', usersControllers.createUser);

// Route pour mettre à jour un utilisateur par son ID
router.put('/users/:id', usersControllers.updateUser);

// Route pour supprimer un utilisateur par son ID
router.delete('/users/:id', usersControllers.deleteUser);

module.exports = router;
