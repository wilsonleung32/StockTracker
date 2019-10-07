# StockTracker

## Info

A fullstack web application, that allows user to buy stock, view owned stocks and view past transactions. Built using Node, Express, React/Redux, with a PostGreSQL database.

## Setup

A PostGreSQL database named "stockapp" is needed to run this app.

```
npm install
createdb stockapp
npm run start-dev
```

## Notes

The Alpha Vantage API used to query stocks has a limit of 5 calls per minute. If this limit is exceeded, some stock values/names will not render properly on the portfolio page. Each stock is
