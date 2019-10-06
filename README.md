# StockTracker

## Info
A fullstack web application, that allows user to buy stock, view owned stocks and view past transactions. Built using Node, Express, React/Redux, with a PostGreSQL database. Users must login/sign up before being able to access any of the features. Users can see the most up to date value of all owned stock on the portfolio page. 
## Setup

A PostGreSQL database named "stockapp" is needed to run this app.

```
npm install 
createdb stockapp
npm run start-dev
```

## Notes
The Alpha Vantage API used to query stocks has a limit of 5 calls per minute. This will lead to some stock values/names not rendering properly on the portfolio page, if this limit is exceeded.
