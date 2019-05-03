import React, { Component, Fragment } from 'react';
import axios from 'axios';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import styles from './StandingsComponent.module.css';

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
export default class StandingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      byLeague: [],
      byWestern: [],
      byEastern: [],
      showLeague: true,
    };
  }

  componentDidMount() {
    axios.get('https://statsapi.web.nhl.com/api/v1/standings/byLeague')
      .then((result) => {
        const items = result.data.records[0].teamRecords.map(dat => dat);
        const teams = [];
        (function getTeams() {
          for (let i = 0; i < items.length; i++) {
            teams.push(items[i]);
          }
        }());
        this.setState({
          byLeague: teams,
        });
      });
    axios.get('https://statsapi.web.nhl.com/api/v1/standings/byConference')
      .then((result) => {
        const items = result.data.records[1].teamRecords.map(dat => dat);
        const westernTeams = [];
        (function getTeams() {
          for (let i = 0; i < items.length; i++) {
            westernTeams.push(items[i]);
          }
        }());
        const easternItems = result.data.records[0].teamRecords.map(dat => dat);
        const easternTeams = [];
        (function getTeams() {
          for (let i = 0; i < easternItems.length; i++) {
            easternTeams.push(easternItems[i]);
          }
        }());
        this.setState({
          byWestern: westernTeams,
          byEastern: easternTeams,
        });
      });
  }

  getTeamLogo = (id) => {
    const src = 'https://www-league.nhlstatic.com/nhl.com/builds/site-core/a2d98717aeb7d8dfe2694701e13bd3922887b1f2_1542226749/images/logos/team/current/team-';
    return (
      <img src={`${src + id}-dark.svg`} alt="Laglogotyp" />
    );
  }

  fetchLeague = () => {
    this.setState({
      showLeague: true,
    });
  }

  fetchConference = () => {
    this.setState({
      showLeague: false,
    });
  }

  render() {
    const {
      byLeague, byWestern, byEastern,
    } = this.state;

    const leagueStandings = byLeague;
    const westernStandings = byWestern;
    const easternStandings = byEastern;

    const leagueColumns = [{
      dataField: 'leagueRank',
      text: 'Rank',
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.id',
      formatter: this.getTeamLogo,
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.name',
      text: 'Lag',
      sort: true,
      headerStyle: () => ({ width: '200px' }),
      style: () => ({ textAlign: 'left', paddingLeft: '20px' }),
    }, {
      dataField: 'gamesPlayed',
      text: 'GP',
      sort: true,
    }, {
      dataField: 'leagueRecord.wins',
      text: 'W',
      sort: true,
    }, {
      dataField: 'leagueRecord.losses',
      text: 'L',
      sort: true,
    }, {
      dataField: 'leagueRecord.ot',
      text: 'OT',
      sort: true,
    }, {
      dataField: 'points',
      text: 'POINTS',
      sort: true,
    }, {
      dataField: 'goalsScored',
      text: 'G',
      sort: true,
    }, {
      dataField: 'goalsAgainst',
      text: 'GA',
      sort: true,
    },
    ];

    const defaultSorted = [{
      dataField: 'points',
      order: 'desc',
    }];

    const westernColumns = [{
      dataField: 'conferenceRank',
      text: 'Rank',
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.id',
      formatter: this.getTeamLogo,
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.name',
      text: 'Lag',
      sort: true,
      headerStyle: () => ({ width: '200px' }),
      style: () => ({ textAlign: 'left', paddingLeft: '20px' }),
    }, {
      dataField: 'gamesPlayed',
      text: 'GP',
      sort: true,
    }, {
      dataField: 'leagueRecord.wins',
      text: 'W',
      sort: true,
    }, {
      dataField: 'leagueRecord.losses',
      text: 'L',
      sort: true,
    }, {
      dataField: 'leagueRecord.ot',
      text: 'OT',
      sort: true,
    }, {
      dataField: 'points',
      text: 'POINTS',
      sort: true,
    }, {
      dataField: 'goalsScored',
      text: 'G',
      sort: true,
    }, {
      dataField: 'goalsAgainst',
      text: 'GA',
      sort: true,
    },
    ];

    const easternColumns = [{
      dataField: 'conferenceRank',
      text: 'Rank',
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.id',
      formatter: this.getTeamLogo,
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.name',
      text: 'Lag',
      sort: true,
      headerStyle: () => ({ width: '200px' }),
      style: () => ({ textAlign: 'left', paddingLeft: '20px' }),
    }, {
      dataField: 'gamesPlayed',
      text: 'GP',
      sort: true,
    }, {
      dataField: 'leagueRecord.wins',
      text: 'W',
      sort: true,
    }, {
      dataField: 'leagueRecord.losses',
      text: 'L',
      sort: true,
    }, {
      dataField: 'leagueRecord.ot',
      text: 'OT',
      sort: true,
    }, {
      dataField: 'points',
      text: 'POINTS',
      sort: true,
    }, {
      dataField: 'goalsScored',
      text: 'G',
      sort: true,
    }, {
      dataField: 'goalsAgainst',
      text: 'GA',
      sort: true,
    },
    ];

    return (
      <div className={styles.wrapper}>
        <div className={styles.buttons}>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton variant="secondary" value={1} style={{ marginRight: '5px', borderRadius: '4px' }} onChange={this.fetchLeague}>Hela ligan</ToggleButton>
            <ToggleButton variant="secondary" value={2} style={{ borderRadius: '4px' }} onChange={this.fetchConference}>Conference</ToggleButton>
          </ToggleButtonGroup>
        </div>
        {this.state.showLeague ? (
          <BootstrapTable
            bootstrap4
            classes="table text-center table-hover table-bordered table-striped table-dark table-borderless"
            keyField="key"
            data={leagueStandings}
            columns={leagueColumns}
            defaultSorted={defaultSorted}
          />
        ) : (
          <Fragment>
            <h2>Western Conference</h2>
            <BootstrapTable
              bootstrap4
              classes="table text-center table-hover table-bordered table-striped table-dark table-borderless"
              keyField="id"
              data={westernStandings}
              columns={westernColumns}
              defaultSorted={defaultSorted}
            />
            <h2>Eastern Conference</h2>
            <BootstrapTable
              bootstrap4
              classes="table text-center table-hover table-bordered table-striped table-dark table-borderless"
              keyField="id"
              data={easternStandings}
              columns={easternColumns}
              defaultSorted={defaultSorted}
            />
          </Fragment>
        )}
      </div>
    );
  }
}
