// errorHandler.js

const { UniqueConstraintError, ValidationError } = require("sequelize");

const errorHandler = (error, req, res, next) => {
    console.error(error.stack); // Log de l'erreur dans la console

    // Déterminer le statut HTTP à envoyer en réponse en fonction du type d'erreur
    let statusCode = error.statusCode || 500;
    let errorMessage = error.message || 'Une erreur est survenue sur le serveur';

    if (error instanceof UniqueConstraintError) {
        // Erreur de contrainte unique : champ déjà pris
        const match = error.message.match(/(?<=Duplicate entry ').*?(?=' for key)/);
        const field = match ? match[0] : 'Champ';
        errorMessage = `${field} déjà pris`;
        statusCode = 400;
    } else if (error instanceof ValidationError) {
        // Erreur de validation : données invalides
        errorMessage = error.message;
        statusCode = 400;
    }

    // Réponse JSON avec le message d'erreur
    res.status(statusCode).json({
        error: {
            message: errorMessage,
            statusCode: statusCode,
        },
    });
};

module.exports = errorHandler;

  