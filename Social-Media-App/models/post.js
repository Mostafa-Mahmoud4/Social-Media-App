const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

module.exports = Post;
