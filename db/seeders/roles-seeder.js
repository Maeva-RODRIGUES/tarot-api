//roles-seeder.js

'use strict'; 

// Exporte un objet qui définit deux méthodes : 'up' et 'down'
module.exports = {
  // La méthode 'up' est utilisée pour ajouter des données à la base de données
  up: async (queryInterface, Sequelize) => {
    // Utilise 'queryInterface.bulkInsert' pour insérer plusieurs enregistrements dans la table 'Roles'
    await queryInterface.bulkInsert('Roles', [
      // Crée un rôle 'Admin' avec les champs 'createdAt' et 'updatedAt' définis à la date actuelle
      { role_name: 'Admin', createdAt: new Date(), updatedAt: new Date() },
      // Crée un rôle 'User' avec les champs 'createdAt' et 'updatedAt' définis à la date actuelle
      { role_name: 'User', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  // La méthode 'down' est utilisée pour annuler les changements apportés par la méthode 'up'
  down: async (queryInterface, Sequelize) => {
    // Utilise 'queryInterface.bulkDelete' pour supprimer tous les enregistrements de la table 'Roles'
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
