import axios from 'axios';
const user = { error: false };
const GET_USER = 'GET_USER';
const UPDATE_CASH = 'UPDATE_CASH';
const SEND_ERROR = 'SEND_ERROR';
const getUser = user => ({ type: GET_USER, user });
export const updateCash = cash => ({ type: UPDATE_CASH, cash });
const sendError = error => ({ type: SEND_ERROR, error });
export const login = credentials => async dispatch => {
  try {
    const res = await axios.put('/login', credentials);
    dispatch(getUser(res.data));
  } catch (error) {
    dispatch(sendError(error));
  }
};
export const signup = credentials => async dispatch => {
  try {
    const res = await axios.post('/signup', credentials);
    dispatch(getUser(res.data));
  } catch (error) {
    dispatch(sendError(error));
  }
};
export const getLoggedIn = () => async dispatch => {
  try {
    const { data } = await axios.get('/me');

    dispatch(getUser(data));
  } catch (error) {
    console.error(error);
  }
};

export default function(state = user, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case UPDATE_CASH:
      return { ...state, cash: action.cash };
    case SEND_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
