/* eslint no-console: "off" */
import { createStore } from 'redux';


/*
    Like before, the application state consists of an array (initialized to be empty).
    The reducer function, myReducer, handles two types of actions: ADD and the new REMOVE.
    By using the array spread syntax in the REMOVE case, the reducer’s implementation continues to be a pure function.
*/

const myReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.value];
    case 'REMOVE': {
      const newState = [...state];
      newState.splice(state.indexOf(action.value), 1);
      return newState;
    }
    default:
      return state;
  }
};
const store = createStore(myReducer);

let lastState = store.getState();
store.subscribe(() => {
  const newState = store.getState();
  console.log(newState);
  console.log(newState === lastState);
  lastState = newState;
});

store.dispatch({ type: 'ADD', value: 'apple' });
store.dispatch({ type: 'ADD', value: 'banana' });
store.dispatch({ type: 'ADD', value: 'cranberry' });
store.dispatch({ type: 'REMOVE', value: 'banana' });
