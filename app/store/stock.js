import axios from 'axios';
import { updateCash } from './user';

const GET_STOCKS = 'GET_STOCKS';

const ownedStocks = [];

const getStocks = stocks => ({ type: GET_STOCKS, stocks });

export const getStocksThunk = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/stocks/all');
    dispatch(getStocks(data));
  } catch (error) {
    console.error(error);
  }
};
export const buyStockThunk = purchase => async dispatch => {
  try {
    const { data } = await axios.post('/api/stocks/buy', purchase);
    dispatch(updateCash(data.cash));
    dispatch(getStocksThunk());
  } catch (error) {
    console.error(error);
  }
};
export default function(state = ownedStocks, action) {
  switch (action.type) {
    case GET_STOCKS:
      return action.stocks;
    default:
      return state;
  }
}
