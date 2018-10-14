/* eslint no-console: "off" */
import { combineReducers, createStore } from 'redux';
import { normalize, schema } from 'normalizr';
import { createSelector } from 'reselect';

const itemSchema = new schema.Entity('items');
const itemsSchema = new schema.Array(itemSchema);

// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH':
    case 'ADD':
    case 'UPDATE': {
      return {
        ...state,
        ...action.value.entities.items,
      };
    }
    case 'REMOVE': {
      const newState = { ...state };
      delete newState[action.value.result];
      return newState;
    }
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case 'FETCH':
      return action.value.result;
    case 'ADD':
      return [...state, action.value.result];
    case 'REMOVE': {
      const newState = [...state];
      newState.splice(state.indexOf(action.value.result), 1);
      return newState;
    }
    default:
      return state;
  }
};
const myReducer = combineReducers({
  byId,
  ids,
});

// SELECTORS
const getItemsIds = state => state.ids;
const getItemsById = state => state.byId;
/* The extra functions getItemsIds and getItemsById are necessary for the reselect implementation as it compares the the return values of these functions. */
const getItems = createSelector(
  [getItemsIds, getItemsById],
  (itemsIds, itemsById) => itemsIds.map(id => itemsById[id]),
);

// ACTION CREATORS
const fetch = items => ({
  type: 'FETCH',
  value: normalize(items, itemsSchema),
});
const update = item => ({
  type: 'UPDATE',
  value: normalize(item, itemSchema),
});
// MISC
const store = createStore(myReducer);
const state = store.getState();
let lastItems = getItems(state);
store.subscribe(() => {
  const newState = store.getState();
  const newItems = getItems(newState);
  console.log(newItems === lastItems);
  lastItems = newItems;
});

/* Comparing the resultant arrays after the execution of the fetch and update action creators properly reflect the change in the array.
Comparing the resultant arrays after the execution of the the BOGUS event, however, does not reflects a change in the array. */
store.dispatch(fetch(
  [{
    id: 'm',
    name: 'mango',
    description: 'Sweet and sticky',
  }, {
    id: 'n',
    name: 'nectarine',
    description: 'Crunchy goodness',
  }],
));
store.dispatch(update(
  {
    id: 'm',
    name: 'mango',
    description: 'Sweet and super sticky',
  },
));
store.dispatch({
  type: 'BOGUS',
});
