import { createStore, combineReducers, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';

const reducer = combineReducers({ user });

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
