const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  ticker: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.FLOAT
  },
  totalPrice: {
    type: Sequelize.FLOAT
  }
});

module.exports = Transaction;
