//Fichier principal de l'application Express.js où nous configurons notre serveur.
// server.js

//Intégrer la librairie express dans notre fichier server.js
const express = require('express');
const app = express();

const tarotRoutes = require('./routes/tarotRoutes');

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Utilisation des routes pour les tirages de tarot
app.use('/api/tarot', tarotRoutes);

// Route de base pour afficher un message de bienvenue lorsque quelqu'un accède à la racine de l'API.
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du tarot en ligne');
});

// Port d'écoute du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});



