// users-seeders.js

'use strict';

const generateUsers = require('../usersMock');

module.exports = {
    up: async (queryInterface, Sequelize) => {
      const users = await generateUsers(10); // Génère 10 utilisateurs fictifs
      await queryInterface.bulkInsert('Users', users.map(user => ({
        name: user.name,
        surname: user.surname,
        email: user.email,
        birthday: user.birthday,
        city_of_birth: user.city_of_birth,
        time_of_birth: user.time_of_birth,
        password: user.password,
        id_Roles: user.id_Roles,
        createdAt: new Date(),
        updatedAt: new Date()
      })), {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
    }
  };
