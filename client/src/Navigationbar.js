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
        src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/PPFINAL_FOREAL.png?alt=media&token=415a72bd-1052-4142-9672-c3fad50ea0fa"
        width="133"
        height="67"
        className="d-inline-block align-top"
        alt=""
      />

      </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/ReportAPet">
              <Nav.Link>Report a pet</Nav.Link>
            </LinkContainer>
            <div className="slashes"> / </div>
            <LinkContainer to="/Success">
              <Nav.Link>Success Stories!</Nav.Link>
            </LinkContainer>
                        <div className="slashes"> / </div>



              {currentUser ? (
                <React.Fragment>

                <LinkContainer to={`/Users/${currentUser.id}`}>
                <Nav.Link>View my profile</Nav.Link>
                </LinkContainer>
                            <div className="slashes"> / </div>

                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>

                <Navbar.Text>Signed in as {currentUser.name}</Navbar.Text>
                </React.Fragment>
              ) : (
                <React.Fragment>
                <LinkContainer to="/Login">
                <Nav.Link className="login">Login</Nav.Link>
                </LinkContainer>
                <div className="slashes"> / </div>
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
