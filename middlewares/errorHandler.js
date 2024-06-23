// errorHandler.js

// Middleware pour gérer les erreurs
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log de l'erreur dans la console
  
    // Déterminer le statut HTTP à envoyer en réponse en fonction du type d'erreur
    let statusCode = err.statusCode || 500;
    if (err.name === 'ValidationError') {
      statusCode = 400; // Erreur de validation des données
    } else if (err.name === 'UnauthorizedError') {
      statusCode = 401; // Erreur d'authentification non autorisée
    }
  
    // Réponse JSON avec le message d'erreur
    res.status(statusCode).json({
      error: {
        message: err.message || 'Une erreur est survenue sur le serveur',
        statusCode: statusCode,
      },
    });
  };
  
  module.exports = errorHandler;
  