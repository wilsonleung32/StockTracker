const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const port = 3000;
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, function() {
  console.log(`Starting server ${port}`);
});
