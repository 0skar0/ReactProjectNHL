import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

import styles from './NavbarComponent.module.css';
import logo from '../../Assets/nhl-logo.png';

class NavbarComponent extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" className={styles.navStyle}>
        <Navbar.Brand><img src={logo} className={styles.logoStyle} alt="NHL logo" /></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="nav-link ml-3" to="/spelare">Spelare</Nav.Link>
          <Nav.Link className="nav-link ml-3" to="/tabell">Tabell</Nav.Link>
          <Nav.Link className="nav-link ml-3" to="/resultat">Resultat</Nav.Link>
        </Nav>
      </Navbar>

    );
  }
}


export default NavbarComponent;
