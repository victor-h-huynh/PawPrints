import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css"
import Navigationbar from './Navigationbar.js';
import axios from 'axios'


class Login extends Component {
    state = {
        email: '',
        password: ''
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
      console.log(response.data.token)
      this.props.updateToken(response.data.token)
    })
    .catch(err => {
      console.log(' register user error: ', err);
    });

}

    render(){
      if (this.props.token) {
        return <div>hi</div>
      } else {

      
        return (
        <Form onSubmit={this.onHandleSubmit}>
          <Navigationbar></Navigationbar>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={this.handleChange} name='email' type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={this.handleChange} name='password' type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <AwesomeButton type="secondary">Login</AwesomeButton>
          </Form>
      )
    }
    }
}

export default Login;
