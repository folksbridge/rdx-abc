'use strict';

var _redux = require('redux');

// reducer
// The application state consists of a single integer (initialized to 0).
// The reducer function, counter, handles two different types of actions: INCREMENT and DECREMENT.
var counter = function counter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments[1];

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}; /* eslint no-console: "off" */

var store = (0, _redux.createStore)(counter);

// subscribe a callback to the store
store.subscribe(function () {
  console.log(store.getState());
});

// dispatch actions that are handled by the reducer.
// consequently, the state is updated and the subscribled callback is called.
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });