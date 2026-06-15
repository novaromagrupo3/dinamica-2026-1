const { DataTypes } = require('sequelize')
const { sequelize } = require('../core/sequelize');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  publishedAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
})

module.exports = Post
