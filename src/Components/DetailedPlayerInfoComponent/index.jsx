import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import styles from './DetailedPlayerInfoComponent.module.css';

/* eslint-disable react/destructuring-assignment */

class DetailedPlayerInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailedPlayerInfo: null,
      errorState: null,
    };
  }

  componentDidMount() {
    const specificPlayerID = this.props.match.params.cell;

    axios.get(`https://statsapi.web.nhl.com/api/v1/people/${specificPlayerID}/?expand=person.stats&stats=yearByYear`)
      .then((res) => {
        const detailedPlayerInfo = res.data;
        this.setState({ detailedPlayerInfo });
      })
      .catch((error) => {
        const errorState = error.message;
        this.setState({ errorState });
      });
  }

  render() {
    const { detailedPlayerInfo } = this.state;

    if (!detailedPlayerInfo) {
      return <p>{this.state.errorState}</p>;
    }

    const reverseStatsArray = detailedPlayerInfo.people[0].stats[0].splits;

    const compare = (a, b) => {
      const seasonA = a.season;
      const seasonB = b.season;
      let comparison = 0;
      if (seasonA > seasonB) {
        comparison = 1;
      } else if (seasonA < seasonB) {
        comparison = -1;
      }
      return comparison * -1;
    };

    reverseStatsArray.sort(compare);
    const goaltender = detailedPlayerInfo.people[0].primaryPosition.type;
    console.log(detailedPlayerInfo.people[0]);
    console.log(goaltender);
    return (
      <div className={styles.tableWrapper}>
        <h5>Statistik</h5>
        <Table striped borderless hover variant="dark">

          <thead className="sticky-top">
            {goaltender === 'Goalie'
              ? (
                <tr className="sticky-top">
                  <th>Säsong</th>
                  <th>Lag</th>
                  <th>Liga</th>
                  <th>Matcher</th>
                  <th>Insläppta mål</th>
                  <th>Räddningsprocent</th>
                  <th>Räddningar</th>
                  <th>Antal skott</th>
                  <th>Hållna nollor</th>
                </tr>
              )
              : (
                <tr className={styles.borderBottom}>
                  <th className="sticky-top">Säsong</th>
                  <th className="sticky-top">Lag</th>
                  <th className="sticky-top">Liga</th>
                  <th
                    className="sticky-top"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Utvisningsminuter"
                  >
                  UM
                  </th>
                  <th className="sticky-top">+/-</th>
                  <th className="sticky-top">Matcher</th>
                  <th className="sticky-top">Mål</th>
                  <th className="sticky-top">Assist</th>
                  <th className="sticky-top">Poäng</th>
                </tr>
              )
          }
          </thead>

          <tbody>
            {detailedPlayerInfo.people[0].stats[0].splits.map((player, i) => (
              <tr key={i} className={styles.borderBottom}>
                <td>{player.season}</td>
                <td>{player.team.name}</td>
                <td>{player.league.name}</td>
                <td>{player.stat.pim}</td>
                <td>{player.stat.plusMinus}</td>
                <td>{player.stat.games}</td>
                <td>{player.stat.goals}</td>
                <td>{player.stat.assists}</td>
                <td>{player.stat.points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(DetailedPlayerInfoComponent);
