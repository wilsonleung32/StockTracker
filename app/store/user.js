import axios from 'axios';
const user = {};
const GET_USER = 'GET_USER';

const getUser = user => ({ type: GET_USER, user });

export const login = credentials => async dispatch => {
  try {
    const res = await axios.put(`/login`, credentials);
    dispatch(getUser(res.data));
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};
export const signup = credentials => async dispatch => {
  try {
    const res = await axios.post(`/signup`, credentials);
    dispatch(getUser(res.data));
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};

export default function(state = user, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
