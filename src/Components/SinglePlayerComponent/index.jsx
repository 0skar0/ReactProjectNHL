import React, { Component } from 'react';
import axios from 'axios';

import styles from './SinglePlayerComponent.module.css';

class SinglePlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      errorState: null,
    };
  }


  componentDidMount() {
    axios.get('https://statsapi.web.nhl.com/api/v1/people/8479407')
      .then((res) => {
        const player = res.data;
        this.setState({ player });
      })
      .catch((error) => {
        const errorState = error.message;
        this.setState({ errorState });
      });
  }


  render() {
    const { player, errorState } = this.state;
    const actionIMG = 'https://nhl.bamcontent.com/images/actionshots/8479407.jpg';
    const headshotIMG = 'https://nhl.bamcontent.com/images/headshots/current/168x168/8479407.jpg';

    const test2 = '1';
    const teamLogo = `https://www-league.nhlstatic.com/nhl.com/builds/site-core/a2d98717aeb7d8dfe2694701e13bd3922887b1f2_1542226749/images/logos/team/current/team-${test2}-dark.svg`;
    if (!player) {
      return <p>{errorState}</p>;
    }
    const janne = player.people[0].height.match(/\d+/)[0];
    console.log(player.people[0]);
    console.log(janne);
    return (
      <div className={styles.singlePlayerWrapper}>
        <img src={actionIMG} alt="playername" />
        <img src={headshotIMG} className={styles.headshotIMG} alt="playername" />
        <h3>
          <img src={teamLogo} className={styles.teamLogo} alt="Logo" />
          {player.people[0].fullName}
          {' '}
          #

          {player.people[0].primaryNumber}
        </h3>
        <p>
          {player.people[0].primaryPosition.type}
          {' '}
          |
          {' Ålder: '}
          {player.people[0].currentAge}
          {' '}
          |
          {' '}
          {player.people[0].height}

        </p>
      </div>
    );
  }
}

export default SinglePlayerComponent;
