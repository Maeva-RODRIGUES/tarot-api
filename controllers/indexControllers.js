// indexControllers.js : centralise tout les fichiers controllers en les importan

const cardsControllers = require('./cardsControllers');
const drawingsControllers = require('./drawingsControllers');
const interpretationsControllers = require('./interpretationsControllers');
const reviewsControllers = require('./reviewsControllers');
const rolesControllers = require('./rolesControllers');
const themesControllers = require('./themesControllers');
const usersControllers = require('./usersControllers');

module.exports = {
    cardsControllers,
    drawingsControllers,
    interpretationsControllers,
    reviewsControllers,
    rolesControllers,
    themesControllers,
    usersControllers
};