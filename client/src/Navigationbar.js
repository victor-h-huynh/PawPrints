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
          <Navbar.Brand href="#home">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/dog.jpg?alt=media&token=3bf752ef-a6b5-44b7-bb73-6e067f5e0bca"
        width="60"
        height="60"
        className="d-inline-block align-top"
        alt=""
      />

      </Navbar.Brand>
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
                <Navbar.Text>Signed in as {currentUser.name}</Navbar.Text>
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
