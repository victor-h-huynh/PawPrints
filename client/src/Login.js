import React, { Component } from 'react';
import { Form } from 'react-bootstrap'; 
import "react-awesome-button/dist/styles.css"
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import setupNotifications from './setupNotifications.js';
import Image from 'react-bootstrap/Image'
import loginCat from './assets/loginCat.jpg';

// Material UI

import { TextField, Grid, Button } from '@material-ui/core/';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';



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
        console.log('')
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = response.data.token;
        this.props.updateToken(response.data.token);
        setupNotifications();
      })
      .catch(err => {
        console.log(' register user error: ', err);
      });

}

    render(){
      if (this.props.token) {
          return <Redirect to={'/'} />;
        }
       else {
        return (
        <React.Fragment>
          <section className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div id="headingGroup" class="text-white text-center d-none d-lg-block">
                  <h1 className="">PAW PRINT</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <Image src="login-cat.jpg" fluid />
            </div>
          </section>
        

          
          <div className="login-form">
            <Form onSubmit={this.onHandleSubmit}>

              <div className="email">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField id="standard-email-input" className="email-control" type="email" margin="normal" onChange={this.handleChange} name='email' label="Enter Email" required/>
                  </Grid>
                </Grid>
              </div>

              <div className="password-form">
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item>
                    <TextField id="standard-password-input" label="Password" className="login-control" type="password" autoComplete="current-password" margin="normal" onChange={this.handleChange} name="password" required />
                  </Grid>
                </Grid>
              </div>

              <Button type="submit" variant="contained" color="primary" className="login-button">
                Sign-in
              </Button>

            </Form>
            
          </div>
          </React.Fragment>
        


      )
    }

    }
}


export default Login;
