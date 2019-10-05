const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,

    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cash: {
    type: Sequelize.FLOAT,
    defaultValue: 5000.0
  }
});

module.exports = User;
