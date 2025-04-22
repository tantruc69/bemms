'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('banned_ips', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ip_address: {
        type: Sequelize.INET,
        unique: true,
        allowNull: false,
      },
      reason: {
        type: Sequelize.TEXT,
      },
      banned_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      expires_at: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('banned_ips');
  },
};