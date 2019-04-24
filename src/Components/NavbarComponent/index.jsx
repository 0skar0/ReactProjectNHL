import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

import styles from './NavbarComponent.module.css';
import logo from '../../Assets/nhl-logo.png';

class NavbarComponent extends Component {
  render() {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        className={styles.navStyle}
        expand="sm"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Brand>
            <img
              src={logo}
              className={styles.logoStyle}
              alt="Svenskifierad NHL-logotyp"
            />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link className="nav-link ml-3" to="/spelare">Spelare</Nav.Link>
            <Nav.Link className="nav-link ml-3" to="/tabell">Tabell</Nav.Link>
            <Nav.Link className="nav-link ml-3" to="/resultat">Resultat</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Sök" className="mr-sm-2" />
            <Button variant="outline-secondary">Sök</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default NavbarComponent;
