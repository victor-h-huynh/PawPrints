import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";

const Navigationbar = ({ current_user, clearCurrentUser, updateToken}) => {
  const currentUser = current_user;

  const logoutUser = () => {
    console.log('click');
    localStorage.clear();
    clearCurrentUser();
  }

  return (
      <Navbar fixed="" collapseOnSelect expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>Paw Print</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/ReportAPet">
              <Nav.Link className= "">Report a pet</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Success">
              <Nav.Link>Success Stories!</Nav.Link>
            </LinkContainer>

           
              {currentUser ? (
                <React.Fragment>
                
                <LinkContainer to={`/Users/${currentUser.id}`}>
                <Nav.Link>View my profile</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
                <p>Signed in as {currentUser.name}</p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                <LinkContainer to="/Login">
                <Nav.Link className="login">Login</Nav.Link>
                </LinkContainer>
            <LinkContainer to="/Register">
              <Nav.Link className="register">Register</Nav.Link>
            </LinkContainer>
            </React.Fragment>
              )}
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
};

export default Navigationbar;
