import React, { Component } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import styles from './GameScheduleComponent.module.css';

class GameScheduleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      responsive: [
        {
          breakpoint: 320,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false },
        },
      ],
    };
  }

  // componentDidMount() {
  //   axios.get('https://nhl-score-api.herokuapp.com/api/scores/latest')
  //     .then((res) => {
  //       this.setState({
  //         dates: res.data.games,
  //         home: res.data.games[0].teams.home,
  //         away: res.data.games[0].teams.away,
  //       });
  //       // console.log(result.dates[0].games[1].teams.home.team.name);
  //     });
  // }

  componentDidMount() {
    axios.get('https://statsapi.web.nhl.com/api/v1/schedule?startDate=2019-04-26&endDate=2019-04-28')
      .then((res) => {
        this.setState({
          dates: res.data,
          test: res.data.dates[0].games,
          team: res.data.dates[0].games[0].teams.home.team.name,
          teamID: res.data.dates[0].games[0].teams.home.team.id,
        });
      });
  }

  render() {
    const {
      dates, home, away, test, team,
    } = this.state;

    console.log(dates);
    console.log(test);
    console.log(team);

    const teamID = '15';
    const teamLogo = `https://www-league.nhlstatic.com/nhl.com/builds/site-core/a2d98717aeb7d8dfe2694701e13bd3922887b1f2_1542226749/images/logos/team/current/team-${teamID}-dark.svg`;
    console.log(teamLogo);

    return (
      <div className={styles.container}>
        <Slider {...this.settings}>
          <div>
            <div className={styles.card}>
              <div className={styles.cardbox}>
                <img src="https://www-league.nhlstatic.com/nhl.com/builds/site-core/a2d98717aeb7d8dfe2694701e13bd3922887b1f2_1542226749/images/logos/team/current/team-6-dark.svg" alt="logo" />
                <h4>{home}</h4>
                <h4>-</h4>
              </div>
              <div className={styles.cardbox}>
                <img src="https://www-league.nhlstatic.com/nhl.com/builds/site-core/a2d98717aeb7d8dfe2694701e13bd3922887b1f2_1542226749/images/logos/team/current/team-29-dark.svg" alt="logo" />
                <h4>{away}</h4>
                <h4>-</h4>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default GameScheduleComponent;
