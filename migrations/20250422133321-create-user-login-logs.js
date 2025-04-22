'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_login_logs', {
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
      login_time: {
        type: Sequelize.DATETIME,
        defaultValue: Sequelize.NOW,
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
        type: Sequelize.TEXT,
      },
      login_method: {
        type: Sequelize.STRING(50),
      },
      user_agent: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING(20),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_login_logs');
  },
};