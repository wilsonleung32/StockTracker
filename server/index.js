const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;
const db = require('./db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });
const passport = require('passport');

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
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'unsecure secret',
    resave: false,
    store: dbStore,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/auth', require('./auth'));
app.use('/api/stocks', require('./api/stocks'));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

dbStore.sync();
db.sync().then(() => {
  app.listen(port, () => {
    console.log(`Starting server ${port}`);
  });
});
