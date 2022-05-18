import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';
import inflection from 'inflection';

//models slice ---------------
const LOAD_MODELS = 'LOAD_MODELS';

export const loadModels = () => {
  return async (dispatch) => {
    const response = await axios({
      url: '/models',
      baseURL: 'http://localhost:42069',
    });
    const responses = response.data.map((model) => inflection.pluralize(model));
    dispatch({ type: LOAD_MODELS, models: response.data });
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
const LOAD_USERS = 'LOAD_users';
const LOAD_TODOS = 'LOAD_todos';

export const genericLoader = (slice) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        url: `/generic/${slice}`,
        baseURL: 'http://localhost:42069',
      });
      dispatch({ type: `LOAD_${slice}`, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const users = (state = [], action) => {
  if (action.type === LOAD_USERS) return action.payload;
  return state;
};

const todos = (state = [], action) => {
  if (action.type === LOAD_TODOS) return action.payload;
  return state;
};

//combine reducers------------------------------
const reducer = combineReducers({
  users,
  todos,
  models,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
