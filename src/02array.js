/* The 3 array examples (including broken/fixed) demostrate one of the three Redux principles
1) Changes are made with pure functions
*/

/* eslint no-console: "off" */
import { createStore } from 'redux';

// reducer
/*
The application state consists of an array (initialized to be empty).
The reducer function, adder, handles a single type of action: ADD.
 */
const adder = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      // state.push(action.value); // BREAKS PURE FUNCTION
      // return state; // BREAKS PURE FUNCTION
      return [...state, action.value];
    default:
      return state;
  }
};

const store = createStore(adder);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: 'ADD', value: 'apple' });
store.dispatch({ type: 'ADD', value: 'banana' });
store.dispatch({ type: 'ADD', value: 'cranberry' });
