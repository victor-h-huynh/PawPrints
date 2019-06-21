import React from 'react';
import { Nav, Navbar, NavDropdown} from 'react-bootstrap';
import styled from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';

const Styles = styled.div`
  .navbar {
    background-color: #4169E1
  }

  .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }

  
`;

export const Navigationbar = () => (
  <Styles>
    <Navbar collapseOnSelect expand="lg">
      <LinkContainer to="/">
            <Navbar.Brand>Paw Print</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/ReportAPet">
            <Nav.Link>Report a pet</Nav.Link>
          </LinkContainer>
          <NavDropdown title="CHANGE THIS IF YOU WANT DROPDOWN" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <LinkContainer to="/Login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Register">
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)

export default Navigationbar;