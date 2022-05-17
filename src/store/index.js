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

// const users = (state = [], action) => {
//   switch (action.type) {
//     case LOAD_USERS:
//       return action.users;
//     case ADD_USER:
//       return [...state, action.newUser];
//     default:
//       return state;
//   }
// };

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

//experiment zone-----------------------------
/*
  get models
  devise a way to get all rows for each model
  get with /:param that will findall and return ffor that param?
  generic gets
  need dnew model for reducer
   - just have a slice prop on action
    - reducer just returns a state
*/
const LOAD_GENERIC = 'LOAD_GENERIC';

export const genericLoader = (slice) => {
  return async (dispatch) => {
    try {
      // const param = inflection.capitalize(inflection.singularize(slice));
      // console.log('>>>', param);
      const param = slice;
      const response = await axios({
        url: `/generic/${param}`,
        baseURL: 'http://localhost:42069',
      });
      console.log(response.data);
      dispatch({ type: LOAD_GENERIC, payload: response.data, slice });
    } catch (error) {
      console.log(error);
    }
  };
};

const genericLoaderReducer = (initialState = [], action) => {
  console.log(action);
  if (action.type === LOAD_GENERIC) return action.payload;
  return initialState;
};
// const users = genericLoaderReducer([], action);

//combine reducers------------------------------
const reducer = combineReducers({
  users: genericLoaderReducer,
  todos,
  models,
  // genericLoaderReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
