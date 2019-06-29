import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css"
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import setupNotifications from './setupNotifications.js';


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

          <div className="login-form">
            <Form onSubmit={this.onHandleSubmit}>

              <Form.Group controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control required className="login-control" onChange={this.handleChange} name='email' type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label></Form.Label>
                <Form.Control required className="login-control" onChange={this.handleChange} name='password' type="password" placeholder="Password" />
              </Form.Group>

              <AwesomeButton type="secondary">Login</AwesomeButton>

            </Form>

          </div>


      )
    }

    }
}





export default Login;
