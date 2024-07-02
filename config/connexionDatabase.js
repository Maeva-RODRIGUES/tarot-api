// Configuration de la connexion à la base de données MariaDB :
// connexionDatabase.js

require ('dotenv').config(); 

module.exports = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    port: 3307
};