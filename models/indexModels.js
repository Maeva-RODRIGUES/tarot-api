// Centralise et organise les importations des models.
//indexModels.js

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');


// Création d'une nouvelle instance de Sequelize avec la configuration de la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST, 
    dialect: 'mariadb',
    port: process.env.DB_PORT || 3307,
    logging: false, // Désactive les logs SQL
    dialectOptions: {
      allowPublicKeyRetrieval: true, // Permettre la récupération de la clé publique
    }
  }
);

const Card = require('./cardsModel')(sequelize, DataTypes);
const Theme = require('./themesModels')(sequelize, DataTypes);
const User = require('./usersModels')(sequelize, DataTypes);
const Review = require('./reviewsModels')(sequelize, DataTypes);
const Role = require('./rolesModels')(sequelize, DataTypes);
const Drawing = require('./drawingsModels')(sequelize, DataTypes);

// Définir les relations
Role.hasMany(User, { foreignKey: 'id_Roles' });
User.belongsTo(Role, { foreignKey: 'id_Roles' });

Theme.hasMany(Drawing, { foreignKey: 'id_Themes' });
Drawing.belongsTo(Theme, { foreignKey: 'id_Themes' });

User.hasMany(Drawing, { foreignKey: 'id_Users' });
Drawing.belongsTo(User, { foreignKey: 'id_Users' });

User.hasMany(Review, { foreignKey: 'id_Users' });
Review.belongsTo(User, { foreignKey: 'id_Users' });

Drawing.belongsToMany(Card, { through: 'to_compose', foreignKey: 'id_Drawings', otherKey: 'id' });
Card.belongsToMany(Drawing, { through: 'to_compose', foreignKey: 'id', otherKey: 'id_Drawings' });

Card.belongsToMany(Theme, { through: 'to_have', foreignKey: 'id', otherKey: 'id_Themes' });
Theme.belongsToMany(Card, { through: 'to_have', foreignKey: 'id_Themes', otherKey: 'id' });

// Synchronisation de Sequelize avec la base de données
sequelize.sync() 
  .then(() => {
    console.log('Models synchronized with the database.');

  });

// Exporter les modèles et l'instance de Sequelize
module.exports = {
    sequelize,
    Sequelize,
    Card,
    Drawing,
    Review,
    Role,
    Theme,
    User
  };