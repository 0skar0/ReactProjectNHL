import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './Screens/Homepage';
import Player from './Screens/Player';
import Players from './Screens/Players';
import Results from './Screens/Results';
import Standings from './Screens/Standings';
import NavbarComponent from './Components/NavbarComponent';
import FooterComponent from './Components/FooterComponent';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Fragment>
          <Router>
            <NavbarComponent />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/spelare/:person.id" component={Player} />
              <Route path="/spelare" component={Players} />
              <Route path="/resultat" component={Results} />
              <Route path="/tabell" component={Standings} />
            </Switch>
          </Router>
          <FooterComponent />
        </Fragment>
      </div>
    );
  }
}

export default App;
