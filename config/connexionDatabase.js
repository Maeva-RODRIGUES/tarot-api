// Configuration de la connexion à la base de données MariaDB :
// connexionDatabase.js

require ('dotenv').config(); 

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    port: process.env.DB_PORT || 3307, 

    },
  };
