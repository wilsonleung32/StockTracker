import axios from 'axios';

const user = { error: false };
const GET_USER = 'GET_USER';
const UPDATE_CASH = 'UPDATE_CASH';
const SEND_ERROR = 'SEND_ERROR';

const getUser = user => ({ type: GET_USER, user });

const sendError = error => ({ type: SEND_ERROR, error });

export const updateCash = cash => ({ type: UPDATE_CASH, cash });

export const login = credentials => async dispatch => {
  try {
    const res = await axios.put('/auth/login', credentials);
    dispatch(getUser(res.data));
  } catch (error) {
    dispatch(sendError(error));
  }
};

export const signup = credentials => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', credentials);
    dispatch(getUser(res.data));
  } catch (error) {
    dispatch(sendError(error));
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(getUser({}));
  } catch (error) {
    console.log(error);
  }
};

export const getLoggedIn = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me');

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
