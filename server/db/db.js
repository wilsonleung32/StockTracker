const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/stockapp', {
  logging: false
});

module.exports = db;
