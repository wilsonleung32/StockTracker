const router = require('express').Router();
const User = require('../db/models/user');

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || user.password !== req.body.password) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Incorrect username and/or password');
    } else {
      req.login(user, error => (error ? next(error) : res.json(user)));
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, error => (error ? next(error) : res.json(user)));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
