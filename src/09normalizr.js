/* eslint no-console: "off" */
import { combineReducers, createStore } from 'redux';
import { normalize, schema } from 'normalizr';

/* The normalizr normalize function converts both the arrays and objects (used in the action’s value) into a common data structure that parallels our store structure */

const itemSchema = new schema.Entity('items');
const itemsSchema = new schema.Array(itemSchema);

/*
Compared to our earlier examples, the reducers are greatly simplified (got rid of the need for the loop and map).
Incidentally, we updated the FETCH action to completely replace the ids instead of appending them. As the FETCH is typically done once early in the application startup, this distinction is more of a formality than a necessity. But, should one choose to FETCH later it is important to not double-up on entries.
*/

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
const store = createStore(myReducer);

const state = store.getState();
let lastById = state.byId;
let lastIds = state.ids;
store.subscribe(() => {
  const newState = store.getState();
  console.log(newState);
  console.log(newState.byId === lastById);
  console.log(newState.ids === lastIds);
  lastById = newState.byId;
  lastIds = newState.ids;
});

store.dispatch({
  type: 'FETCH',
  value: normalize(
    [{
      id: 'm',
      name: 'mango',
      description: 'Sweet and sticky',
    }, {
      id: 'n',
      name: 'nectarine',
      description: 'Crunchy goodness',
    }],
    itemsSchema,
  ),
});
store.dispatch({
  type: 'UPDATE',
  value: normalize(
    {
      id: 'm',
      name: 'mango',
      description: 'Sweet and super sticky',
    },
    itemSchema,
  ),
});
