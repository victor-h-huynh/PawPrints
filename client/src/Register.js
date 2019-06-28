import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import 'react-awesome-button/dist/styles.css';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReportAPet: false,

      id: "",
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      alerts: false,

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
        this.setState({
          id: response.data.id,
          redirectToReportAPet: true
        });
      })
      .catch(err => {
        console.log(" register user error: ", err);
      });
  };
  render() {
    if (this.state.redirectToReportAPet === true) {
      return <Redirect to={`/ReportAPet`} />;
    } else {
      return (
        <div className="register-form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="register-control"
                  type="name"
                  name="name"
                  placeholder="Enter name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="register-control"
                  name="email"
                  value={this.state.email}
                  placeholder="Enter email"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="register-control"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formGridPasswordConfirmation">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  className="register-control"
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  value={this.state.password_confirmation}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formGridPostalPhoneNumber">
                <Form.Label>Phone Number</Form.Label>

                <Form.Control
                  className="register-control"
                  name="phone_number"
                  placeholder="Enter Phone Number"
                  value={this.state.phone_number}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form>
              <Form.Group controlId="formGridAlerts">
                <Form.Check
                  type="checkbox"
                  label="Alerts"
                  name="alerts"
                  onChange={this.handleChecked}
                />
              </Form.Group>
              <AwesomeButton ripple={true} size="medium" type="secondary">Register</AwesomeButton>
            </Form>
          </Form>
        </div>
      );
    }
  }
}

export default Register;
