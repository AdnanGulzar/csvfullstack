const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('newdb', '1234', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;