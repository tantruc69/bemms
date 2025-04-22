'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('link_click_logs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      link_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'links',
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
        type: Sequelize.TEXT,
      },
      referer: {
        type: Sequelize.TEXT,
      },
      user_agent: {
        type: Sequelize.TEXT,
      },
      clicked_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('link_click_logs');
  },
};