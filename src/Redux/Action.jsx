import axios from 'axios';

// Action creator that returns an action object
export const addPlayers = items => ({
  type: 'ADD_PLAYERS',
  players: items,
});

// Action creator that returns an action object
export const fetchLoading = bool => ({
  type: 'FETCH_LOADING',
  loading: bool,
});

// Action creator that returns an action object
export const fetchError = bool => ({
  type: 'FETCH_ERROR',
  error: bool,
});

// Using redux-thunk we can make our action creator return a
// function instead of an action object. This allows us to make asynchronous
// calls that we will dispatch the relevant data to our redux store when it is ready.
export const fetchPlayers = url => (dispatch) => {
  dispatch(fetchLoading(true));
  axios.get(url)
    .then((response) => {
      const items = response.data.teams.map(dat => dat);
      const swePlayers = [];
      for (let i = 0; i < items.length; i += 1) {
        for (let x = 0; x < items[i].roster.roster.length; x += 1) {
          if (items[i].roster.roster[x].person.nationality === 'SWE') {
            swePlayers.push(items[i].roster.roster[x].person);
          }
        }
      }
      dispatch(addPlayers(swePlayers));
      dispatch(fetchLoading(false));
    })
    /* eslint-disable no-unused-vars */
    .catch((error) => {
      /* eslint-enable no-unused-vars */
      dispatch(fetchError(true));
    });
};
