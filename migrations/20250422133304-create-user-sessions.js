'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_sessions', {
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
      ip_address: {
        type: Sequelize.INET,
      },
      mac_address: {
        type: Sequelize.STRING(50),
      },
      device_info: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.STRING(255),
      },
      login_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      logout_time: {
        type: Sequelize.DATE,
      },
      is_successful: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_unusual: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_sessions');
  },
};