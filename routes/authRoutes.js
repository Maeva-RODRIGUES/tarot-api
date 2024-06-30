// authRoutes.js

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route pour l'authentification et la génération d'un jeton JWT
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // TODO: Vérifiez les identifiants contre la base de données
  if ('vérification réussie') {
    const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Identifiants incorrects' });
  }
});

module.exports = router;