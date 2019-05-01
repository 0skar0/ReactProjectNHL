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
    console.log(this.props);
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
    console.log(detailedPlayerInfo.people[0].stats[0]);
    return (
      <div className={styles.tableWrapper}>
        <h5>Statistik</h5>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Säsong</th>
              <th>Lag</th>
              <th>Liga</th>
              <th>UM</th>
              <th>+/-</th>
              <th>Mål</th>
              <th>Assist</th>
              <th>Poäng</th>
            </tr>
          </thead>
          {detailedPlayerInfo.people[0].stats[0].splits.map((player, i) => (
            <tbody key={i}>
              <tr>
                {console.log(player)}
                <td>{player.season}</td>
                <td>{player.team.name}</td>
                <td>{player.league.name}</td>
                <td>{player.stat.pim}</td>
                <td>{player.stat.plusMinus}</td>
                <td>{player.stat.goals}</td>
                <td>{player.stat.assists}</td>
                <td>{player.stat.points}</td>
              </tr>
            </tbody>
          ))}
          <tbody>
            <tr>
              <td>{detailedPlayerInfo.people[0].stats[0].splits[0].season}</td>
              <td>{detailedPlayerInfo.people[0].stats[0].splits[0].team.name}</td>
              <td>SHL</td>
              <td>34</td>
              <td>19</td>
              <td>5</td>
              <td>14</td>
              <td>19</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(DetailedPlayerInfoComponent);
