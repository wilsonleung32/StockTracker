const User = require('./user');
const Stock = require('./stock');
const Transaction = require('./transaction');
User.hasMany(Stock);
Stock.belongsTo(User);
User.hasMany(Transaction);
Transaction.belongsTo(User);
module.exports = {
  User,
  Stock
};
