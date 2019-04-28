import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { fetchPlayers } from '../../Redux/Action';
import './PlayersTableComponent.css';

class PlayersTableComponent extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
  };

  /* eslint-disable react/destructuring-assignment */
  // Runs when the component is mounted to the DOM
  componentDidMount = () => {
    this.props.fetchPlayers('http://localhost:3000/teams');
  }

  getLinks = (cell, row) => (
    <NavLink to={`/spelare/${row.id}`} style={{ color: 'lightblue' }}>{cell}</NavLink>
  )

  getLogo = (cell) => {
    const source = 'https://www-league.nhlstatic.com/nhl.com/builds/site-core/a2d98717aeb7d8dfe2694701e13bd3922887b1f2_1542226749/images/logos/team/current/team-';
    return (
      <img style={{ width: 25, height: 25 }} src={`${source + cell}-dark.svg`} alt="" />
    );
  }

  fetchPlayoffs = (event) => {
    event.preventDefault();
    if (this.props.players[0].stats[0].type.displayName === 'statsSingleSeason') {
      this.props.fetchPlayers('http://localhost:3000/teams');
    }
  }

  fetchRegular = (event) => {
    event.preventDefault();
    if (this.props.players[0].stats[0].type.displayName === 'statsSingleSeasonPlayoffs') {
      this.props.fetchPlayers('http://localhost:3000/teams');
    }
  }
  /* eslint-enable react/destructuring-assignment */

  filterAll = () => {
    this.textFilter('');
  }

  filterForwards = () => {
    this.textFilter('Forward');
  }

  filterDefensemen = () => {
    this.textFilter('Defenseman');
  }

  // Lifecycle method that render our JSX code into the DOM
  render() {
    const { players, error } = this.props;
    const columns = [{
      dataField: 'fullName',
      text: 'Namn',
      formatter: this.getLinks,
      sort: true,
    }, {
      dataField: 'currentTeam.id',
      text: 'Lag',
      formatter: this.getLogo,
      sort: true,
    }, {
      dataField: 'primaryPosition.type',
      text: 'Position',
      sort: true,
      filter: textFilter({
        getFilter: (filter) => {
          this.textFilter = filter;
        },
      }),
    }, {
      dataField: 'currentAge',
      text: 'Ålder',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.games',
      text: 'Spelade Matcher',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.assists',
      text: 'Assist',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.goals',
      text: 'Mål',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.points',
      text: 'Poäng',
      sort: true,
    }];
    const defaultSorted = [{
      dataField: 'stats[0].splits[0].stat.points',
      order: 'desc',
    }];
    return (
      <div className="tablewrapper">
        <div className="buttonwrapper">
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton variant="secondary" value={1} onChange={this.fetchRegular}>Grundserie</ToggleButton>
            <ToggleButton variant="secondary" value={2} onChange={this.fetchPlayoffs}>Slutspel</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton variant="secondary" value={1} onChange={this.filterAll}>Alla Spelare</ToggleButton>
            <ToggleButton variant="secondary" value={2} onChange={this.filterForwards}>Forwards</ToggleButton>
            <ToggleButton variant="secondary" value={3} onChange={this.filterDefensemen}>Backar</ToggleButton>
          </ToggleButtonGroup>
        </div>
        {error && <p>Error fetching.</p>}
        <BootstrapTable
          bootstrap4
          classes="table text-center table-hover table-bordered table-striped table-dark table-borderless"
          keyField="id"
          data={players}
          columns={columns}
          defaultSorted={defaultSorted}
          pagination={paginationFactory()}
          filter={filterFactory()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.players,
    error: state.error,
  };
}

const mapDispatchToProps = {
  fetchPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersTableComponent);
