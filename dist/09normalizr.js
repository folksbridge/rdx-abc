'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint no-console: "off" */


var _redux = require('redux');

var _normalizr = require('normalizr');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* The normalizr normalize function converts both the arrays and objects (used in the action’s value) into a common data structure that parallels our store structure */

var itemSchema = new _normalizr.schema.Entity('items');
var itemsSchema = new _normalizr.schema.Array(itemSchema);

/*
Compared to our earlier examples, the reducers are greatly simplified (got rid of the need for the loop and map).
Incidentally, we updated the FETCH action to completely replace the ids instead of appending them. As the FETCH is typically done once early in the application startup, this distinction is more of a formality than a necessity. But, should one choose to FETCH later it is important to not double-up on entries.
*/

var byId = function byId() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'FETCH':
    case 'ADD':
    case 'UPDATE':
      {
        return _extends({}, state, action.value.entities.items);
      }
    case 'REMOVE':
      {
        var newState = _extends({}, state);
        delete newState[action.value.result];
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
    case 'FETCH':
      return action.value.result;
    case 'ADD':
      return [].concat(_toConsumableArray(state), [action.value.result]);
    case 'REMOVE':
      {
        var newState = [].concat(_toConsumableArray(state));
        newState.splice(state.indexOf(action.value.result), 1);
        return newState;
      }
    default:
      return state;
  }
};
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
  type: 'FETCH',
  value: (0, _normalizr.normalize)([{
    id: 'm',
    name: 'mango',
    description: 'Sweet and sticky'
  }, {
    id: 'n',
    name: 'nectarine',
    description: 'Crunchy goodness'
  }], itemsSchema)
});
store.dispatch({
  type: 'UPDATE',
  value: (0, _normalizr.normalize)({
    id: 'm',
    name: 'mango',
    description: 'Sweet and super sticky'
  }, itemSchema)
});