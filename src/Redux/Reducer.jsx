export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PLAYERS':
      return ({
        ...state,
        players: [
          ...action.players,
        ],
      });
    case 'FETCH_ERROR':
      return ({
        ...state,
        error: action.error,
      });

    default:
      return state;
  }
};
