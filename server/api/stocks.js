const router = require('express').Router();
const User = require('../db/models/user');
const Stock = require('../db/models/stock');
const Transaction = require('../db/models/transaction');
const axios = require('axios');

router.get('/all', async (req, res, next) => {
  try {
    const stockNames = await Stock.findAll({ where: { userId: +req.user.id } });

    const allStocks = stockNames.map(stock => {
      let ticker = stock.ticker;
      const promise = axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=ESNDFL30LZMAZGOS`
      );
      return promise;
    });
    const cleanedStocks = await Promise.all(allStocks).then(function(array) {
      return array.map((stock, idx) => ({
        ...stock.data['Global Quote'],
        quantity: stockNames[idx].quantity
      }));
    });

    res.json(cleanedStocks);
  } catch (error) {
    next(error);
  }
});

router.get('/transactions', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});
router.post('/buy', async (req, res, next) => {
  try {
    const stock = await Stock.findOrCreate({
      where: { userId: +req.user.id, ticker: req.body['01. symbol'] }
    });

    await Transaction.create({
      userId: +req.user.id,
      ticker: req.body['01. symbol'],
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice
    });
    await stock[0].updateQuantity(Number(req.body.quantity));
    const user = await User.findByPk(req.user.id);
    user.cash -= parseFloat(req.body.totalPrice);

    await user.save();
    res.json({ cash: user.cash });
  } catch (error) {
    next(error);
  }
});

router.get('/:ticker', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.ticker}&apikey=ESNDFL30LZMAZGOS`
    );

    if (data.Note || data['Error Message'])
      res.status(400).send('Invalid Ticker');
    else res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
