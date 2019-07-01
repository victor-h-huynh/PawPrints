import axios from "axios";
import { Redirect } from "react-router-dom";
import React, { Component } from 'react';
import { Form, Alert, Container } from 'react-bootstrap';
import setupNotifications from './setupNotifications.js';
import Image from 'react-bootstrap/Image'
import registerCat from './assets/registerCat.jpg'

// Material UI

import { TextField, Grid, Button } from '@material-ui/core/';
import PermIdentity from '@material-ui/icons/PermIdentityTwoTone';
import Email from '@material-ui/icons/EmailTwoTone';
import Lock from '@material-ui/icons/LockTwoTone';
import LockOpen from '@material-ui/icons/LockOpenTwoTone';
import PhoneIphone from '@material-ui/icons/PhoneIphoneTwoTone';
import Loyalty from '@material-ui/icons/LoyaltyTwoTone';
import Create from '@material-ui/icons/CreateTwoTone';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,

      id: "",
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      alerts: false,
      errors: [],
      street_number: "",
      street_name: "",
      apartment: "",
      city: "",
      province: "",
      postal_code: "",
      latitude: 45.501,
      longitude: -73.567
    };
  }




  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleChecked = () => {
    if (this.state.alerts) {
      this.setState({ alerts: false });
    } else {
      this.setState({ alerts: !this.state.alerts });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/api/users", {
        address: {
          street_number: this.state.street_number,
          street_name: this.state.street_name,
          apartment: this.state.apartment,
          city: this.state.city,
          province: this.state.province,
          postal_code: this.state.postal_code
        },
        user: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          phone_number: this.state.phone_number,
          alerts: this.state.alerts
        }
      })
      .then(response => {
        this.props.addAUser(response.data);
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = response.data.token;
        this.props.updateToken(response.data.token);
        if (this.state.alerts === true) {setupNotifications()};
        this.setState({
          id: response.data.id,
          redirectToLogin: true
        });
      })
      .catch(err => {
        console.log(" register user error: ", err.response.data);
        this.setState({
          errors: err.response.data
        })
      });
  };

  render() {
    const { errors } = this.state;
    if (this.state.redirectToLogin === true) {
      return <Redirect to={`/Login`} />;
    } else {
      return (
        <React.Fragment>
        {/* {this.showAlerts()} */}

      <div fluid className="registerContainer">
        <div className="registerOverlay">
            <Image className="registerCat"src={registerCat} fluided/>
        </div>
      </div>

              <div className="registerForm">
                  <h2 className="registerTitle">Register</h2>
                  <Loyalty className="registerLoyaltyIcon"/>
                <Form onSubmit={this.handleSubmit}>

                  <div className="registersName">
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PermIdentity className="registerNameIcon"/>
                      </Grid>
                      <Grid item>
                        <TextField id="standard-name-input" className="registerNameText" type="name" margin="normal" value={this.state.name} onChange={this.handleChange} name='name' label="Name" required/>
                      </Grid>
                    </Grid>
                  </div>

                  <div className="registerEmail">
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <Email className="registerEmailIcon"/>
                      </Grid>
                      <Grid item>
                        <TextField id="standard-email-input" className="registerEmailText" type="email" margin="normal" value={this.state.email} onChange={this.handleChange} name="email" label="Email" required />
                      </Grid>
                    </Grid>
                  </div>

                  <div className="registerPassword">
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <Lock className="registerPasswordIcon"/>
                      </Grid>
                      <Grid item>
                        <TextField id="standard-password-input" className="registerPasswordText" type="password" margin="normal" value={this.state.password} onChange={this.handleChange} name="password" label="Password" required />
                      </Grid>
                    </Grid>
                  </div>

                  <div className="registerPasswordConfirmation">
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <LockOpen className="registerPasswordIcon"/>
                      </Grid>
                      <Grid item>
                        <TextField id="standard-password-confirmation-input" className="registerPasswordConfirmationText" type="password" margin="normal" value={this.state.password_confirmation} onChange={this.handleChange} name="password_confirmation" label="Confirm Password" required />
                      </Grid>
                    </Grid>
                  </div>

                  <div className="registerPhoneNumber">
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PhoneIphone className="registerPhoneIphoneIcon"/>
                      </Grid>
                      <Grid item>
                        <TextField id="standard-phone-number-input" className="registerPhoneNumberText" type="phone" margin="normal" value={this.state.phone_number} onChange={this.handleChange} name="phone_number" label="Phone Number" required />
                      </Grid>
                    </Grid>
                  </div>

              
                  <Form.Group controlId="formGridAlerts">
                    <Form.Check
                      className="registerAlerts"
                      type="checkbox"
                      label="Alerts (receive a push notification when a pet is lost or found in your area)"
                      name="alerts"
                      onChange={this.handleChecked}
                    />
                    <p className="registerAlertsText">To receive notifications, click allow when you receive the popup</p>
                  </Form.Group>
            

                <Button type="submit" variant="contained" color="primary" className="registerBtn">
                  <Create className="registerCreateIcon"/>
                  Register
                </Button>

              </Form>
            </div>
        </React.Fragment>
      );
    }
  }
}

export default Register;
