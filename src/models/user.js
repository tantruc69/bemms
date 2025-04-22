const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING(100),
  },
  avatar_url: {
    type: DataTypes.TEXT,
  },
  phone_number: {
    type: DataTypes.STRING(20),
  },
  address: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.STRING(100),
  },
  country: {
    type: DataTypes.STRING(100),
  },
  last_login_at: {
    type: DataTypes.DATE,
  },
  login_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  email_verified_at: {
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
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = User;
