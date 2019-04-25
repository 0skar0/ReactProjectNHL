import React, { Component } from 'react';
import GameScheduleComponent from '../Components/GameScheduleComponent';

class Homepage extends Component {
  render() {
    return (
      <div className="wrapper">
        <GameScheduleComponent />
      </div>
    );
  }
}

export default Homepage;
