import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css"
import Navigationbar from './Navigationbar.js';

class Register extends Component {
  render() {
    return (
      <Form>
        <Navigationbar></Navigationbar>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder="Enter City"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridProvince">
              <Form.Label>Province</Form.Label>
              <Form.Control placeholder="Enter Province" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridStreetName">
              <Form.Label>Street Name</Form.Label>
              <Form.Control placeholder="Enter Street Name"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridStreetNumber">
              <Form.Label>Street #</Form.Label>
              <Form.Control placeholder="Enter Street #" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridApartmentNumber">
              <Form.Label>Apartment #</Form.Label>
              <Form.Control placeholder="Enter Apartment #"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control placeholder="Enter PostalCode" />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>

          <AwesomeButton type="secondary">Register</AwesomeButton>
        </Form>
    );
  }
}

export default Register;
