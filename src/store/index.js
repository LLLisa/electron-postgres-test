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
      baseURL: 'http://localhost:42069', //should be dynamic
    });
    const responses = response.data.map((model) => inflection.pluralize(model));
    dispatch({ type: LOAD_MODELS, payload: response.data });
  };
};

const models = (state = [], action) => {
  if (action.type === LOAD_MODELS) return action.payload;
  return state;
};

//experiment zone-----------------------------

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

const genericReducer = (slice) => {
  return (state = [], action) => {
    console.log(action);
    if (action.type === `LOAD_${slice}`) return action.payload;
    return state;
  };
};

//combine reducers------------------------------
const reducer = combineReducers({
  models,
  users: genericReducer('users'),
  todos: genericReducer('todos'),
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
