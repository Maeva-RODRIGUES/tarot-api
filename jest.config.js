module.exports = {
    testMatch: [
      '**/unit/**/*.test.js', // Pour les tests unitaires
      '**/integration/**/*.test.js' // Pour les tests d'intégration
    ],
    roots: [
      '<rootDir>/unit', // Répertoire des tests unitaires
      '<rootDir>/integration' // Répertoire des tests d'intégration
    ]
    // Autres configurations Jest peuvent être ajoutées ici
  };
  