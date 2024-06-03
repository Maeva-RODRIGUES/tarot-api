// Centralise et organise les importations des models.
//indexModels.js

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Création d'une nouvelle instance de Sequelize avec la configuration de la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST, 
    dialect: 'mariadb',
    port: process.env.DB_PORT || 3306,
    logging: false // Désactive les logs SQL
  }
);

const Card = require('./cardsModel')(sequelize, DataTypes);
const Theme = require('./themesModels')(sequelize, DataTypes);
const Interpretation = require('./interpretationsModels')(sequelize, DataTypes);
const User = require('./usersModels')(sequelize, DataTypes);
const Review = require('./reviewsModels')(sequelize, DataTypes);
const Role = require('./rolesModels')(sequelize, DataTypes);
const Drawing = require('./drawingsModels')(sequelize, DataTypes);

// Définir les relations
Role.hasMany(User, { foreignKey: 'id_Roles' });
User.belongsTo(Role, { foreignKey: 'id_Roles' });

Theme.hasMany(Interpretation, { foreignKey: 'id_Themes' });
Interpretation.belongsTo(Theme, { foreignKey: 'id_Themes' });

Theme.hasMany(Drawing, { foreignKey: 'id_Themes' });
Drawing.belongsTo(Theme, { foreignKey: 'id_Themes' });

User.hasMany(Drawing, { foreignKey: 'id_Users' });
Drawing.belongsTo(User, { foreignKey: 'id_Users' });

User.hasMany(Review, { foreignKey: 'id_Users' });
Review.belongsTo(User, { foreignKey: 'id_Users' });

Drawing.belongsToMany(Card, { through: 'compose', foreignKey: 'id_drawings' });
Card.belongsToMany(Drawing, { through: 'compose', foreignKey: 'id_cards' });

// Synchronisation de Sequelize avec la base de données
sequelize.sync({ force: true }) 
  .then(() => {
    console.log('Models synchronized with the database.');

    // Création des rôles après la synchronisation
    return Role.bulkCreate([
      { role_name: 'Admin' },
      { role_name: 'User' }
    ]);
  })
  .then(() => {
    console.log('Roles created');
  })
  .catch(err => {
    console.error('Error syncing database or creating roles:', err);
  });

// Exporter les modèles et l'instance de Sequelize
module.exports = {
    sequelize,
    Card,
    Drawing,
    Interpretation,
    Review,
    Role,
    Theme,
    User
  };