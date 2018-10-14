'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint no-console: "off" */


var _redux = require('redux');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
The reducer function ids remains unchanged; updating does not change and object’s id.
The UPDATE implementation of the byId reducer is identical to the ADD implementation; so the change is trivial (adding one line).
*/

var byId = function byId() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD':
    case 'UPDATE':
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
    case 'FETCH':
      {
        var _entry = {};
        for (var i = 0; i < action.value.length; i += 1) {
          var item = action.value[i];
          _entry[item.id] = item;
        }
        return _extends({}, state, _entry);
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
    case 'FETCH':
      return [].concat(_toConsumableArray(state), _toConsumableArray(action.value.map(function (o) {
        return o.id;
      })));
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
  value: [{
    id: 'm',
    name: 'mango',
    description: 'Sweet and sticky'
  }, {
    id: 'n',
    name: 'nectarine',
    description: 'Crunchy goodness'
  }]
});
store.dispatch({
  type: 'UPDATE',
  value: {
    id: 'm',
    name: 'mango',
    description: 'Sweet and super sticky'
  }
});