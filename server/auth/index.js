const router = require('express').Router();
const User = require('../db/models/user');

router.get('/me', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findByPk(req.user.id);

      res.json({
        id: user.id,
        email: user.email,
        cash: user.cash,
        name: user.name
      });
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});
router.post('/logout', (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || user.password !== req.body.password) {
      res.status(401).send('Wrong username/password');
    } else {
      req.login(user, error =>
        error
          ? next(error)
          : res.json({
              id: user.id,
              email: user.email,
              cash: user.cash,
              name: user.name
            })
      );
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, error =>
      error
        ? next(error)
        : res.json({
            id: user.id,
            email: user.email,
            cash: user.cash,
            name: user.name
          })
    );
  } catch (error) {
    const message = error.errors[0].message;

    switch (message) {
      case 'Validation notEmpty on password failed':
        res.status(401).send('Password must not be empty');
        break;
      case 'Validation isEmail on email failed':
        res.status(401).send('Invalid Email');
        break;
      case 'email must be unique':
        res.status(401).send('A user already exists with this email');
        break;
      default:
        next(error);
    }
  }
});

module.exports = router;
