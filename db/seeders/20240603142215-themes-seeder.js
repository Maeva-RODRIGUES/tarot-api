'use strict';

const themes = require('../themesMock');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Themes', themes.map(theme => ({
      title_theme: theme.title_theme,
      meaning_theme: theme.meaning_theme.join(', '), // Convert the array to a string
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Themes', null, {});
  }
};
