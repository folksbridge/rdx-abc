'use strict';

var _redux = require('redux');

var adder = function adder() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD':
      state.push(action.value); // BREAKS PURE FUNCTION
      return state; // BREAKS PURE FUNCTION
    default:
      return state;
  }
}; /* eslint no-console: "off" */


var store = (0, _redux.createStore)(adder);

// different state references (lastSate/newSate) pointing to the same state object
var lastState = store.getState();
store.subscribe(function () {
  var newState = store.getState();
  console.log(newState);
  console.log(newState === lastState);
  lastState = newState;
});

store.dispatch({ type: 'ADD', value: 'apple' });
store.dispatch({ type: 'ADD', value: 'banana' });
store.dispatch({ type: 'ADD', value: 'cranberry' });