import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

//slice
const LOAD_USERS = 'LOAD_USERS';

export const loadUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios({
        url: '/users',
        baseURL: 'http://localhost:42069',
      });
      dispatch({ type: LOAD_USERS, users: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const users = (state = [], action) => {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    default:
      return state;
  }
};

const reducer = combineReducers({
  users: users,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
