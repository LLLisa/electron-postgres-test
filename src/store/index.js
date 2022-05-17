import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';
import inflection from 'inflection';

//users slice----------------
const LOAD_USERS = 'LOAD_USERS';
const ADD_USER = 'ADD_USER';

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

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/users',
        baseURL: 'http://localhost:42069',
        data: { user },
      });
      dispatch({ type: ADD_USER, newUser: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const users = (state = [], action) => {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    case ADD_USER:
      return [...state, action.newUser];
    default:
      return state;
  }
};

//todos slice----------------
const LOAD_TODOS = 'LOAD_TODOS';

export const loadTodos = () => {
  return async (dispatch) => {
    try {
      const response = await axios({
        url: '/todos',
        baseURL: 'http://localhost:42069',
      });
      dispatch({ type: LOAD_TODOS, todos: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const todos = (state = [], action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return action.todos;
    default:
      return state;
  }
};

//models slice ---------------
const LOAD_MODELS = 'LOAD_MODELS';

export const loadModels = () => {
  return async (dispatch) => {
    const response = await axios({
      url: '/models',
      baseURL: 'http://localhost:42069',
    });
    console.log(response); //no data on 2nd run
    const responses = response.data.map((model) => inflection.pluralize(model));
    dispatch({ type: LOAD_MODELS, models: responses });
  };
};

const models = (state = [], action) => {
  switch (action.type) {
    case LOAD_MODELS:
      return action.models;
    default:
      return state;
  }
};

//experiment zone-------------------------------
const SWITCH_DB = 'SWITCH_DB';

export const switchDb = (databaseName) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        url: `/database/${databaseName}`,
        baseURL: 'http://localhost:42069',
      });
      console.log(response.data);
      dispatch({ type: SWITCH_DB, dbName: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const database = (state = '', action) => {
  switch (action.type) {
    case SWITCH_DB:
      return action.dbName;
    default:
      return state;
  }
};

//----------------------------------------------

//combine reducers------------------------------
const reducer = combineReducers({
  users,
  todos,
  models,
  database,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
