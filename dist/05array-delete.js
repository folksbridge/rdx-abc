'use strict';

var _redux = require('redux');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint no-console: "off" */


/*
    Like before, the application state consists of an array (initialized to be empty).
    The reducer function, myReducer, handles two types of actions: ADD and the new REMOVE.
    By using the array spread syntax in the REMOVE case, the reducer’s implementation continues to be a pure function.
*/

var myReducer = function myReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD':
      return [].concat(_toConsumableArray(state), [action.value]);
    case 'REMOVE':
      {
        var newState = [].concat(_toConsumableArray(state));
        newState.splice(state.indexOf(action.value), 1);
        return newState;
      }
    default:
      return state;
  }
};
var store = (0, _redux.createStore)(myReducer);

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
store.dispatch({ type: 'REMOVE', value: 'banana' });