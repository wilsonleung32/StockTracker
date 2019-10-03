const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
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
