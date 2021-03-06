import axios from 'axios';

const defaultUser = { error: false, total: 0 };
const GET_USER = 'GET_USER';
const UPDATE_CASH = 'UPDATE_CASH';
const SEND_ERROR = 'SEND_ERROR';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const DELETE_USER = 'DELETE_USER';
export const updateTotal = total => ({ type: UPDATE_TOTAL, total });
const getUser = user => ({ type: GET_USER, user });
const deleteUser = () => ({ type: DELETE_USER });
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
    dispatch(deleteUser());
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

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, ...action.user };
    case UPDATE_CASH:
      return { ...state, cash: action.cash };
    case SEND_ERROR:
      return { ...state, error: action.error };
    case UPDATE_TOTAL:
      return { ...state, total: action.total };
    case DELETE_USER:
      return { error: false, total: 0 };
    default:
      return state;
  }
}
