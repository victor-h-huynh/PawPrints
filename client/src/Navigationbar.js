import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";

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

const Navigationbar = ({ current_user, clearCurrentUser, updateToken}) => {
  const currentUser = current_user;

  const logoutUser = () => {
    console.log('click');
    localStorage.clear();
    clearCurrentUser();
  }

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

           
              {currentUser ? (
                <React.Fragment>
                <p>Signed in as {currentUser.name}</p>
                <LinkContainer to={`/Users/${currentUser.id}`}>
                <Nav.Link>View my profile</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                <LinkContainer to="/Login">
                <Nav.Link>Login</Nav.Link>
                </LinkContainer>
            <LinkContainer to="/Register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
            </React.Fragment>
              )}
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};

export default Navigationbar;
