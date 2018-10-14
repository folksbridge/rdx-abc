/* eslint no-console: "off" */
import { createStore } from 'redux';

const adder = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.value];
    default:
      return state;
  }
};

const store = createStore(adder);

// different state references (lastSate/newSate) pointing to the different state object
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
