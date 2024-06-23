// usersRoutes.js

const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');

// Route pour récupérer tous les utilisateurs
router.get('/', usersControllers.getAllUsers);

// Route pour récupérer un utilisateur spécifique par son ID
router.get('/:id', usersControllers.getUserById);

// Route pour créer un nouvel utilisateur
router.post('/', usersControllers.createUser);

// Route pour mettre à jour un utilisateur par son ID
router.put('/:id', usersControllers.updateUser);

// Route pour supprimer un utilisateur par son ID
router.delete('/:id', usersControllers.deleteUser);

module.exports = router;
