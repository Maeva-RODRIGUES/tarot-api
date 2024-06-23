// Installer les dépendances suivantes avant de coder ce fichier : 
// 1. jsonwebtoken : Pour la création et la vérification des tokens JWT.
// 2. bcrypt : Pour le hachage des mots de passe.
// auth.js contient les implémentations des fonctions nécessaires pour gérer les authentifications comme : Créer et vérifier les tokens JWT pour sécuriser les routes.

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Générer un token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Middleware pour protéger les routes
const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attacher l'utilisateur décodé à la requête
      next();
    } catch (error) {
      res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  } else {
    res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

module.exports = { generateToken, protect };
