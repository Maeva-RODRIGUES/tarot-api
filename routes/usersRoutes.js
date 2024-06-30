// usersRoutes.js

const jwt = require('jsonwebtoken');
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');

// Middleware de validation des résultats
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
  
  // Route pour récupérer tous les utilisateurs
  router.get('/', usersControllers.getAllUsers);
  
  // Route pour récupérer un utilisateur spécifique par son ID
  router.get('/:id', 
    param('id').isInt().withMessage('ID doit être un entier'),
    validate,
    usersControllers.getUserById
  );
  
  // Route pour créer un nouvel utilisateur
  router.post('/', 
    [
      body('name').notEmpty().withMessage('Le nom est requis'),
      body('surname').notEmpty().withMessage('Le prénom est requis'),
      body('email').isEmail().withMessage('Entrez un email valide'),
      body('birthday').isISO8601().withMessage('Entrez une date de naissance valide'),
      body('city_of_birth').notEmpty().withMessage('La ville de naissance est requise'),
      body('time_of_birth').matches(/\d{2}:\d{2}/).withMessage('L\'heure de naissance doit être au format HH:MM'),
      body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
    ],
    validate,
    usersControllers.createUser
  );
  
  // Route pour mettre à jour un utilisateur par son ID
  router.put('/:id', 
    [
      param('id').isInt().withMessage('ID doit être un entier'),
      body('name').optional().notEmpty().withMessage('Le nom ne peut pas être vide'),
      body('surname').optional().notEmpty().withMessage('Le prénom ne peut pas être vide'),
      body('email').optional().isEmail().withMessage('Entrez un email valide'),
      body('birthday').optional().isISO8601().withMessage('Entrez une date de naissance valide'),
      body('city_of_birth').optional().notEmpty().withMessage('La ville de naissance ne peut pas être vide'),
      body('time_of_birth').optional().matches(/\d{2}:\d{2}/).withMessage('L\'heure de naissance doit être au format HH:MM'),
      body('password').optional().isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
    ],
    validate,
    usersControllers.updateUser
  );
  
  // Route pour supprimer un utilisateur par son ID
  router.delete('/:id', 
    param('id').isInt().withMessage('ID doit être un entier'),
    validate,
    usersControllers.deleteUser
  );

  
  module.exports = router;
