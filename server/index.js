const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const port = 3000;
const db = require('./db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
const passport = require('passport');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
app.use(
  session({
    secret: 'unsecure secret',
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', require('./auth'));
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
dbStore.sync();
db.sync().then(() => {
  app.listen(port, () => {
    console.log(`Starting server ${port}`);
  });
});
