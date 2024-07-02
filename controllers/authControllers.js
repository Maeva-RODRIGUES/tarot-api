//authControllers.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models/indexModels'); // chemin du fichier indexModels ou tous les models sont centralisés

const authControllers = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Afficher les valeurs de username et password pour le débogage
      console.log('Username:', username);
      console.log('Password:', password);

      // Rechercher l'utilisateur dans la base de données
      const user = await User.findOne({ where: { username } });
      
      if (!user) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
      }

      // Comparer le mot de passe fourni avec le hachage stocké
      const isMatch = await bcrypt.compare(password, user.passwordHash);

      // Afficher le résultat de la comparaison pour le débogage
      console.log('Password match:', isMatch);

      if (isMatch) {
        // Générer le token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Identifiants incorrects' });
      }
    } catch (error) {
      // Affichez l'erreur dans la console pour le débogage
      console.error('Login error:', error);

      // Personnaliser le message d'erreur en fonction de l'erreur capturée
      let errorMessage = 'Une erreur interne est survenue';
      if (error.name === 'SequelizeDatabaseError') {
        errorMessage = 'Service de base de données temporairement indisponible';
      } else if (error.name === 'ValidationError') {
        errorMessage = 'Données de requête non valides';
      }
     

      res.status(500).json({ message: errorMessage });
    }
  }
};


module.exports = authControllers;

