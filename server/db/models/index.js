const User = require('./user');
const Stock = require('./stock');
User.hasMany(Stock);
Stock.belongsTo(User);
module.exports = {
  User,
  Stock
};
