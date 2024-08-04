const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('facebook_app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
