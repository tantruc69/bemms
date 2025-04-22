const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Link = sequelize.define('Link', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  original_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  short_code: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  short_url: {
    type: DataTypes.VIRTUAL,
    get() {
      return `https://yourdomain.com/${this.short_code}`;
    },
  },
  title: {
    type: DataTypes.STRING(255),
  },
  description: {
    type: DataTypes.TEXT,
  },
  click_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  expires_at: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'links',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Link;