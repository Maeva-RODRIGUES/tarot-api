const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/usersModels'); // Assurez-vous que ce chemin mène à votre modèle d'utilisateur
const router = express.Router();

// Route pour l'authentification et la génération d'un jeton JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Trouvez l'utilisateur par son nom d'utilisateur
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Vérifiez le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Générez un jeton JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

module.exports = router;
