import axios from 'axios';
import { updateCash, updateTotal } from './user';

const GET_STOCKS = 'GET_STOCKS';

const ownedStocks = [];

const getStocks = stocks => ({ type: GET_STOCKS, stocks });

export const getStocksThunk = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/stocks/all');
    dispatch(getStocks(data));

    const total = data.reduce((acc, curr) => {
      const val = Number(
        (parseFloat(curr['05. price']) * curr.quantity).toFixed(2)
      );
      return acc + val;
    }, 0);

    dispatch(updateTotal(total));
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
