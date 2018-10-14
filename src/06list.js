/* eslint no-console: "off" */
import { combineReducers, createStore } from 'redux';

/*
The application state consists of two leaves, byId (initialized as an empty object) and ids (initialized as an empty array).
The reducer function, myReducer is formed by combining two reducer functions (each managing their leaf of the object tree) and handles two types of actions: ADD and REMOVE.
*/

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD': {
      const entry = {};
      entry[action.value.id] = action.value;
      return {
        ...state,
        ...entry,
      };
    }
    case 'REMOVE': {
      const newState = { ...state };
      delete newState[action.value.id];
      return newState;
    }
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.value.id];
    case 'REMOVE': {
      const newState = [...state];
      newState.splice(state.indexOf(action.value.id), 1);
      return newState;
    }
    default:
      return state;
  }
};

/* This example introduces the ES2015 object literal shorthand syntax in the combineReducers call and the proposed (but often used in Redux applications) JavaScript object spread syntax in the ADD implementation. */
const myReducer = combineReducers({
  byId,
  ids,
});

const store = createStore(myReducer);

const state = store.getState();
let lastById = state.byId;
let lastIds = state.ids;
store.subscribe(() => {
  const newState = store.getState();
  console.log(newState);
  console.log(newState.byId === lastById);
  console.log(newState.ids === lastIds);
  lastById = newState.byId;
  lastIds = newState.ids;
});

store.dispatch({
  type: 'ADD',
  value: {
    id: 'a',
    name: 'apple',
    description: 'Red, sweet, and tart',
  },
});
store.dispatch({
  type: 'ADD',
  value: {
    id: 'b',
    name: 'banana',
    description: 'Yellow, sweet, and creamy',
  },
});
store.dispatch({
  type: 'ADD',
  value: {
    id: 'c',
    name: 'cranberry',
    description: 'Red and sour',
  },
});
store.dispatch({
  type: 'REMOVE',
  value: {
    id: 'b',
    name: 'banana',
    description: 'Yellow, sweet, and creamy',
  },
});
