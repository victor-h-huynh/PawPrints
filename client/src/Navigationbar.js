import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";

const Styles = styled.div`
  .navbar {
    background-color: #00BCD4;
    padding: 0;
  }

  .navbar-brand,
  .navbar-nav .nav-link {
    color: #FFFFFF;

    &:hover {
      color: #757575;
    }
  }
`;

export const Navigationbar = ({ current_user }) => {
  const currentUser = current_user;

  return (
    <Styles>
      <Navbar fixed="" collapseOnSelect expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>Paw Print</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/ReportAPet">
              <Nav.Link>Report a pet</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Success">
              <Nav.Link>Success Stories!</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/Login">
              {currentUser ? (
                <p>Signed in as {currentUser.name}</p>
              ) : (
                <Nav.Link>Login</Nav.Link>
              )}
            </LinkContainer>
            <LinkContainer to="/Register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};

export default Navigationbar;
