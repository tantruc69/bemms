'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING(100),
      },
      avatar_url: {
        type: Sequelize.TEXT,
      },
      phone_number: {
        type: Sequelize.STRING(20),
      },
      address: {
        type: Sequelize.TEXT,
      },
      city: {
        type: Sequelize.STRING(100),
      },
      country: {
        type: Sequelize.STRING(100),
      },
      last_login_at: {
        type: Sequelize.DATE,
      },
      login_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      email_verified_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};