'use strict';

const cardsData = require('../cards'); // Assurez-vous que le chemin est correct

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cards', cardsData.map(card => ({
      name_card: card.name_card,
      keyword1: card.keyword1,
      keyword2: card.keyword2,
      keyword3: card.keyword3,
      image_url: card.image_url, // Assurez-vous que cette propriété est définie dans vos données
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cards', null, {});
  }
};
