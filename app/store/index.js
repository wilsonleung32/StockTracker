import { createStore, combineReducers, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import ownedStocks from './stock';
const reducer = combineReducers({ user, ownedStocks });

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
