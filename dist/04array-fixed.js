'use strict';

var _redux = require('redux');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint no-console: "off" */


var adder = function adder() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD':
      return [].concat(_toConsumableArray(state), [action.value]);
    default:
      return state;
  }
};

var store = (0, _redux.createStore)(adder);

// different state references (lastSate/newSate) pointing to the different state object
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