'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('links', {
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
        onDelete: 'SET NULL',
      },
      original_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      short_code: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
      },
      short_url: {
        type: Sequelize.TEXT,
        generated: {
          type: Sequelize.VIRTUAL,
          args: ['short_code'],
          get() {
            return `https://yourdomain.com/${this.short_code}`;
          },
        },
      },
      title: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.TEXT,
      },
      click_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      expires_at: {
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
    await queryInterface.dropTable('links');
  },
};