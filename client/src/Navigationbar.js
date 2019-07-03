import React from "react";
import { Nav, Navbar, Form } from "react-bootstrap";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

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
              <Nav.Link className= ""><h5 className="navReport">Report a pet</h5></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Success">
              <Nav.Link><h5 className="navSuccess">Success Stories!</h5></Nav.Link>
            </LinkContainer>


              {currentUser ? (
                <React.Fragment>

                <LinkContainer to={`/Users/${currentUser.id}`}>
                <Nav.Link><h5>View my profile</h5></Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={logoutUser}><h5>Logout</h5></Nav.Link>
                <Navbar.Text><h5>Signed in as {currentUser.name}</h5></Navbar.Text>
                </React.Fragment>
              ) : (
                <React.Fragment>
                <LinkContainer to="/Login">
                <Nav.Link className="login"><h5 className="">Login</h5></Nav.Link>
                </LinkContainer>
            <LinkContainer to="/Register">
              <Nav.Link className="register"><h5 className="">Register</h5></Nav.Link>
            </LinkContainer>
            </React.Fragment>
              )}

          </Nav>
        </Navbar.Collapse>
      </Navbar>

    //   <div className="">
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton edge="start" className="" color="inherit" aria-label="Menu">
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" className="">
    //         News
    //       </Typography>
    //       <Button color="inherit">Login</Button>
    //     </Toolbar>
    //   </AppBar>
    // </div>
  );
};

export default Navigationbar;
