const Sequelize = require('sequelize');

const sequelize = new Sequelize('adi', 'root', 'Fahi@987', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;