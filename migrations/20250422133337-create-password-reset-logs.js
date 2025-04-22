'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('password_reset_logs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      reset_token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      requested_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      used_at: {
        type: Sequelize.DATE,
      },
      ip_address: {
        type: Sequelize.INET,
      },
      user_agent: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'pending',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('password_reset_logs');
  },
};