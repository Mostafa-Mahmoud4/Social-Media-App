const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
    allowNull: false,
  },
  userId: {
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

Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

module.exports = Comment;
