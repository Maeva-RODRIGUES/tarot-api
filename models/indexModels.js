// Centralise et organise les importations des models.
//indexModels.js

const sequelize = require('../db/sequelizeSetUp');
const { DataTypes } = require('sequelize');

const Card = require('./cardsModel')(sequelize, DataTypes);
const Theme = require('./themesModels')(sequelize, DataTypes);
const Interpretation = require('./interpretationsModels')(sequelize, DataTypes);
const User = require('./usersModels')(sequelize, DataTypes);
const Review = require('./reviewsModels')(sequelize, DataTypes);
const Role = require('./rolesModels')(sequelize, DataTypes);
const Drawing = require('./drawingsModels')(sequelize, DataTypes);

module.exports = {
    Card,
    Theme,
    Interpretation,
    User,
    Review,
    Role,
    Drawing
};