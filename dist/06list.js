'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint no-console: "off" */


var _redux = require('redux');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
The application state consists of two leaves, byId (initialized as an empty object) and ids (initialized as an empty array).
The reducer function, myReducer is formed by combining two reducer functions (each managing their leaf of the object tree) and handles two types of actions: ADD and REMOVE.
*/

var byId = function byId() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD':
      {
        var entry = {};
        entry[action.value.id] = action.value;
        return _extends({}, state, entry);
      }
    case 'REMOVE':
      {
        var newState = _extends({}, state);
        delete newState[action.value.id];
        return newState;
      }
    default:
      return state;
  }
};
var ids = function ids() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD':
      return [].concat(_toConsumableArray(state), [action.value.id]);
    case 'REMOVE':
      {
        var newState = [].concat(_toConsumableArray(state));
        newState.splice(state.indexOf(action.value.id), 1);
        return newState;
      }
    default:
      return state;
  }
};

/* This example introduces the ES2015 object literal shorthand syntax in the combineReducers call and the proposed (but often used in Redux applications) JavaScript object spread syntax in the ADD implementation. */
var myReducer = (0, _redux.combineReducers)({
  byId: byId,
  ids: ids
});

var store = (0, _redux.createStore)(myReducer);

var state = store.getState();
var lastById = state.byId;
var lastIds = state.ids;
store.subscribe(function () {
  var newState = store.getState();
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
    description: 'Red, sweet, and tart'
  }
});
store.dispatch({
  type: 'ADD',
  value: {
    id: 'b',
    name: 'banana',
    description: 'Yellow, sweet, and creamy'
  }
});
store.dispatch({
  type: 'ADD',
  value: {
    id: 'c',
    name: 'cranberry',
    description: 'Red and sour'
  }
});
store.dispatch({
  type: 'REMOVE',
  value: {
    id: 'b',
    name: 'banana',
    description: 'Yellow, sweet, and creamy'
  }
});