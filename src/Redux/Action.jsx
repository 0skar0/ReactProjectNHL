import axios from 'axios';

export const addPlayers = items => ({
  type: 'ADD_PLAYERS',
  players: items,
});

export const fetchError = bool => ({
  type: 'FETCH_ERROR',
  error: bool,
});

export const fetchPlayers = url => (dispatch) => {
  axios.get(url)
    .then((response) => {
      const items = response.data.map(dat => dat.roster.roster);
      const swePlayers = [];
      for (let i = 0; i < items.length; i += 1) {
        for (let x = 0; x < items[i].length; x += 1) {
          if (items[i][x].person.nationality === 'SWE') {
            swePlayers.push(items[i][x].person);
          }
        }
      }
      dispatch(addPlayers(swePlayers));
    })
    /* eslint-disable no-unused-vars */
    .catch((error) => {
      /* eslint-enable no-unused-vars */
      dispatch(fetchError(true));
    });
};
