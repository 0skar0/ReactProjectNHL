import { combineReducers } from 'redux';

const initialState = {
  users: [],
};


const root = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case 'LOAD_USERS':
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};

export default combineReducers({
  root,
});
