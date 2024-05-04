// Configuration de la connexion à la base de données MariaDB :
// database.js

module.exports = {
    database: 'tarot_db',
    username: 'root',
    password: '', // Mot de passe vide
    host: 'localhost',
    dialect: 'mariadb',
    port: 3306 // Le port par défaut pour MariaDB est 3306
};