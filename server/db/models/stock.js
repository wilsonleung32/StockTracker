const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  ticker: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,

    defaultValue: 0
  },
  price: {
    type: Sequelize.INTEGER
  },
  totalPrice: {
    type: Sequelize.INTEGER
  }
});

Stock.prototype.updateQuantity = async function(quantity) {
  const updated = this.quantity + quantity;
  this.quantity = updated;
  await this.save();
};
module.exports = Stock;
