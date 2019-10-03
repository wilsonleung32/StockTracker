const router = require('express').Router();
const User = require('../db/models/user');
const Stock = require('../db/models/stock');
const axios = require('axios');

router.get('/all', async (req, res, next) => {
  try {
    const stocks = await Stock.findAll({ where: { userId: +req.user.id } });
    res.json(stocks);
  } catch (error) {
    next(error);
  }
});
router.get('/:ticker', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.ticker}&apikey=ESNDFL30LZMAZGOS`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post('/buy', async (req, res, next) => {
  try {
    const stock = await Stock.findOrCreate({
      where: { userId: +req.user.id, ticker: req.body['01. symbol'] }
    });

    await stock[0].updateQuantity(Number(req.body.quantity));
    res.json(stock);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
