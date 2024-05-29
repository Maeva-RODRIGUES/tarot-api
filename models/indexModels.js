// Centralise et organise les importations des models.

const Card = require('./cardsModel');
const Theme = require('./themesModels');
const Interpretation = require('./interpretationsModels');
const User = require('./usersModels');
const Review = require('./reviewsModels');
const Role = require('./rolesModels');

module.exports = {
    Card,
    Theme,
    Interpretation,
    User,
    Review,
    Role
};