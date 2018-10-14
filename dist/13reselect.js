'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint no-console: "off" */


var _redux = require('redux');

var _normalizr = require('normalizr');

var _reselect = require('reselect');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var itemSchema = new _normalizr.schema.Entity('items');
var itemsSchema = new _normalizr.schema.Array(itemSchema);

// REDUCERS
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

// SELECTORS
var getItemsIds = function getItemsIds(state) {
  return state.ids;
};
var getItemsById = function getItemsById(state) {
  return state.byId;
};
/* The extra functions getItemsIds and getItemsById are necessary for the reselect implementation as it compares the the return values of these functions. */
var getItems = (0, _reselect.createSelector)([getItemsIds, getItemsById], function (itemsIds, itemsById) {
  return itemsIds.map(function (id) {
    return itemsById[id];
  });
});

// ACTION CREATORS
var fetch = function fetch(items) {
  return {
    type: 'FETCH',
    value: (0, _normalizr.normalize)(items, itemsSchema)
  };
};
var update = function update(item) {
  return {
    type: 'UPDATE',
    value: (0, _normalizr.normalize)(item, itemSchema)
  };
};
// MISC
var store = (0, _redux.createStore)(myReducer);
var state = store.getState();
var lastItems = getItems(state);
store.subscribe(function () {
  var newState = store.getState();
  var newItems = getItems(newState);
  console.log(newItems === lastItems);
  lastItems = newItems;
});

/* Comparing the resultant arrays after the execution of the fetch and update action creators properly reflect the change in the array.
Comparing the resultant arrays after the execution of the the BOGUS event, however, does not reflects a change in the array. */
store.dispatch(fetch([{
  id: 'm',
  name: 'mango',
  description: 'Sweet and sticky'
}, {
  id: 'n',
  name: 'nectarine',
  description: 'Crunchy goodness'
}]));
store.dispatch(update({
  id: 'm',
  name: 'mango',
  description: 'Sweet and super sticky'
}));
store.dispatch({
  type: 'BOGUS'
});