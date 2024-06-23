// errorHandler.js

const { UniqueConstraintError, ValidationError } = require("sequelize");

// Middleware pour gérer les erreurs
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log de l'erreur dans la console

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Une erreur est survenue sur le serveur';

  if (err instanceof UniqueConstraintError) {
    const substrings = err.parent.sqlMessage.split(`'`);
    const field = substrings[substrings.length - 2];
    message = `${field} déjà pris`;
    statusCode = 400;
  } else if (err instanceof ValidationError) {
    message = err.message;
    statusCode = 400;
  } else if (err.name === 'UnauthorizedError') {
    message = 'Erreur d\'authentification non autorisée';
    statusCode = 401;
  }

  res.status(statusCode).json({
    error: {
      message: message,
      statusCode: statusCode,
    },
  });
};

module.exports = errorHandler;
  