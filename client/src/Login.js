import React, { Component } from 'react';
import { Form } from 'react-bootstrap'; 
import { Container } from 'react-bootstrap';
import "react-awesome-button/dist/styles.css"
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import setupNotifications from './setupNotifications.js';
import Image from 'react-bootstrap/Image'
import loginCat from './assets/loginCat.jpg';

// Material UI

import { TextField, Grid, Button } from '@material-ui/core/';
import Email from '@material-ui/icons/EmailTwoTone';
import Lock from '@material-ui/icons/LockTwoTone';
import Face from '@material-ui/icons/FaceTwoTone';
import VpnKey from '@material-ui/icons/VpnKey';
import Hidden from '@material-ui/core/Hidden';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// import Checkbox from '@material-ui/core/Checkbox';

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };

    onHandleSubmit = (event) => {
    event.preventDefault();
    console.log("This worked")


    axios
      .post('http://localhost:3001/api/authentication', {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = response.data.token;
        this.props.updateToken(response.data.token);
        setupNotifications();
      })
      .catch(err => {
        console.log(" register user error: ", err.response);
      });

}

    render(){
      if (this.props.token) {
          return <Redirect to={'/'} />;
        }
       else {
        return (
        <React.Fragment>
          <div className="loginContainer">

          <Hidden className="registerOverlay" smDown>
              <Image className="loginCat" src={loginCat}/>
            </Hidden>

              <div className="login-form">
                <h2 className="login-title">Sign in</h2>
                <Face className="loginFaceIcon"/>
              
              
              <Form onSubmit={this.onHandleSubmit}>

                <div className="noFlex">
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <Email className="loginEmailIcon"/>
                    </Grid>
                    <Grid item className="inputFields">
                      <TextField id="standard-email-input" className="email-text" type="email" margin="normal" onChange={this.handleChange} value={this.state.email} name='email' label="Enter Email" required/>
                    </Grid>
                  </Grid>
                </div>

                <div className="noFlex">
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <Lock className="loginLockIcon"/>
                    </Grid>
                    <Grid item className="inputFields">
                      <TextField id="standard-password-input" label="Password" className="password-text" type="password" autoComplete="current-password" margin="normal" value={this.state.password} onChange={this.handleChange} name="password" required />
                    </Grid>
                  </Grid>
                </div>

                <Button type="submit" className="btn-primary">
                  <VpnKey className="vpnKeyIcon"/>
                  Sign in
                </Button>

              </Form>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}


export default Login;