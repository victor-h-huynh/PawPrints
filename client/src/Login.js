import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css"
import Navigationbar from './Navigationbar.js';


class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    render(){
        return (
        <Form>
          <Navigationbar></Navigationbar>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <AwesomeButton type="secondary">Login</AwesomeButton>
          </Form>
      )
    }
}

export default Login;
