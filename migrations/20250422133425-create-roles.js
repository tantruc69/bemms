'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  },
};