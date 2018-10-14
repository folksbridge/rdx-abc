'use strict';

var _redux = require('redux');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* The 3 array examples (including broken/fixed) demostrate one of the three Redux principles
                                                                                                                                                                                                    1) Changes are made with pure functions
                                                                                                                                                                                                    */

/* eslint no-console: "off" */


// reducer
/*
The application state consists of an array (initialized to be empty).
The reducer function, adder, handles a single type of action: ADD.
 */
var adder = function adder() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD':
      // state.push(action.value); // BREAKS PURE FUNCTION
      // return state; // BREAKS PURE FUNCTION
      return [].concat(_toConsumableArray(state), [action.value]);
    default:
      return state;
  }
};

var store = (0, _redux.createStore)(adder);

store.subscribe(function () {
  console.log(store.getState());
});

store.dispatch({ type: 'ADD', value: 'apple' });
store.dispatch({ type: 'ADD', value: 'banana' });
store.dispatch({ type: 'ADD', value: 'cranberry' });