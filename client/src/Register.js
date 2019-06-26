import React, {
  Component
} from "react";
import {
  Form,
  Col,
} from "react-bootstrap";
import {
  AwesomeButton
} from "react-awesome-button";
import "react-awesome-button/dist/styles.css"
import Navigationbar from './Navigationbar.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReportAPet: false,

      id: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone_number: '',
      alerts: false,

      street_number: '',
      street_name: '',
      apartment: '',
      city: '',
      province: '',
      postal_code: '',
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
      this.setState({alerts: false});
    }
    else {
    this.setState({alerts: !this.state.alerts});
  }
  }


  handleSubmit = event => {
    event.preventDefault();

    axios
      .post('http://localhost:3001/api/users', {
        address: {
          street_number: this.state.street_number,
          street_name: this.state.street_name,
          apartment: this.state.apartment,
          city: this.state.city,
          province: this.state.province,
          postal_code: this.state.postal_code,

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
        console.log(' register user error: ', err);
      });



  };
  render() {
    if (this.state.redirectToReportAPet === true) {
      return <Redirect to={`/ReportAPet`} />;
    } else {

                return (
        <React.Fragment>
          <Navigationbar/>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                name='name'
                placeholder='Enter name'
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='email'
                value={this.state.email}
                placeholder='Enter email'
                onChange={this.handleChange}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Enter Password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPasswordConfirmation'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                name='password_confirmation'
                placeholder='Enter Password Confirmation'
                value={this.state.password_confirmation}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

                    <Form.Row>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='city'
                name='city'
                placeholder='Enter City'
                value={this.state.city}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridProvince'>
              <Form.Label>Province</Form.Label>
              <Form.Control
                name='province'
                value={this.state.province}
                placeholder='Enter Province'
                onChange={this.handleChange}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridStreetName'>
              <Form.Label>Stree Name</Form.Label>
              <Form.Control
                type='street_name'
                name='street_name'
                placeholder='Enter Street Namee'
                value={this.state.street_name}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridStreetNumber'>
              <Form.Label>Street Number</Form.Label>
              <Form.Control
                type='street_number'
                name='street_number'
                placeholder='Enter Street Number'
                value={this.state.street_number}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>



                    <Form.Row>
            <Form.Group as={Col} controlId='formGridApartmentNumber'>
              <Form.Label>Apartment Number</Form.Label>
              <Form.Control
                type='apartment'
                name='apartment'
                placeholder='Enter Apartment Number'
                value={this.state.apartment}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPostalCode'>
              <Form.Label>PostalCode</Form.Label>
              <Form.Control
                name='postal_code'
                placeholder='Enter Postal Code'
                value={this.state.postal_code}
                onChange={this.handleChange}
              >
              </Form.Control>
            </Form.Group>




             <Form.Group as={Col} controlId='formGridPostalPhoneNumber'>
              <Form.Label>Phone Number</Form.Label>

              <Form.Control
                name='phone_number'
                placeholder='Enter Phone Number'
                value={this.state.phone_number}
                onChange={this.handleChange}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridAlerts'>

            <Form.Check type="checkbox" label="Alerts" name='alerts' onChange={this.handleChecked}/>

            </Form.Group>


          </Form.Row>
          <Form>
          <AwesomeButton type="secondary">Register</AwesomeButton>
        </Form>

        </Form>
        </React.Fragment>
      );


  }
}
}

          export default Register;





