/* eslint no-console: "off" */
import { createStore } from 'redux';

// reducer
// The application state consists of a single integer (initialized to 0).
// The reducer function, counter, handles two different types of actions: INCREMENT and DECREMENT.
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};
const store = createStore(counter);

// subscribe a callback to the store
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch actions that are handled by the reducer.
// consequently, the state is updated and the subscribled callback is called.
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
