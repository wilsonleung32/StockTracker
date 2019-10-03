const router = require('express').Router();
const User = require('../db/models/user');

router.get('/me', async (req, res, next) => {
  try {
    // console.log(req.user.id);
    if (req.user) {
      const user = await User.findByPk(req.user.id);

      res.json(user);
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || user.password !== req.body.password) {
      res.sendStatus(401);
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
