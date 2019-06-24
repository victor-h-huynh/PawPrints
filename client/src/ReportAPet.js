import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import Navigationbar from './Navigationbar.js';
// import DayPicker from 'react-day-picker'
import { Redirect } from 'react-router-dom'


// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }

//"gs://final-project-1561040119727.appspot.com/"

class ReportAPet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToProfile: false,

      id: '',
      name: '',
      species: '',
      status: '',
      date_lost: '',
      picture: null,
      user_id: '',

      breed: '',
      colour: '',
      sex: '',
      additional: '',

      street_number: '',
      street_name: '',
      apartment: '',
      city: '',
      province: '',
      postal_code: '',
      latitude: 45.7,
      longitude: 73.1
    };
  }

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      picture: event.target.files[0]
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/api/pets', {
        description: {
          breed: this.state.breed,
          colour: this.state.colour,
          sex: this.state.sex,
          additional: this.state.additional
        },
        address: {
          street_number: this.state.street_number,
          street_name: this.state.street_name,
          apartment: this.state.apartment,
          city: this.state.city,
          province: this.state.province,
          postal_code: this.state.postal_code,
          latitude: 45.7,
          longitude: -73.1
        },
        pet: {
          name: this.state.name,
          species: this.state.species,
          status: this.state.status,
          date_lost: this.state.date,
          picture: this.state.picture,
          user_id: 1
        }
      })
      .then(response => {
        this.setState({
          id: response.data.id,
          redirectToProfile: true
        });
        // this.props.history.push(`/pets/${this.state.id}`);
      })
      .catch(err => {
        console.log('report pet error: ', err);
      });
  };

  render() {
      if (this.state.redirectToProfile === true) {
        return <Redirect to={`/pets/${this.state.id}`}/>
      } else {
      return (
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

            <Form.Group as={Col} controlId='formGridSpecies'>
              <Form.Label>Species</Form.Label>
              <Form.Control
                as='select'
                name='species'
                value={this.state.species}
                onChange={this.handleChange}
              >
                <option>Enter a Species</option>
                <option>Cat</option>
                <option>Dog</option>
                <option>[̲̅$̲̅(̲̅2οο̲̅)̲̅$̲̅]</option>
                <option>__̴ı̴̴̡̡̡ ̡͌l̡̡̡ ̡͌l̡*̡̡ ̴̡ı̴̴̡ ̡̡͡|̲̲̲͡͡͡ ̲▫̲͡ ̲̲̲͡͡π̲̲͡͡ ̲̲͡▫̲̲͡͡ ̲|̡̡̡ ̡ ̴̡ı̴̡̡ ̡͌l̡̡̡̡.___</option>
                <option>(╭ರ_•́)</option>
                <option>( ^​_^）o自自o（^_​^ )</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridBreed'>
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type='breed'
                name='breed'
                placeholder='Enter Breed'
                value={this.state.breed}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridStatus'>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as='select'
                name='status'
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option>Status</option>
                <option>Lost</option>
                <option>Found</option>
                <option>Reunited</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridStatus'>
              <Form.Label>Sex</Form.Label>
              <Form.Control
                as='select'
                name='sex'
                value={this.state.sex}
                onChange={this.handleChange}
              >
                <option>Sex</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridColoir'>
              <Form.Label>Colour</Form.Label>
              <Form.Control
                type='name'
                name='colour'
                placeholder='Colour'
                value={this.state.colour}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridDateLost'>
              <Form.Label>Date Lost</Form.Label>
              <Form.Control
                type='name'
                name='date_lost'
                placeholder='Date Lost'
                value={this.state.date_lost}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridLastSeen'>
              <Form.Label>Last known location</Form.Label>
              <Form.Control placeholder='Last Seen' />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridAdditionalComments'>
              <Form.Label>Additional Comments</Form.Label>
              <Form.Control
                placeholder=''
                name='additional'
                value={this.state.additional}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <input
              type='file'
              name='picture'
              onChange={this.fileSelectedHandler}
            />
          </Form.Row>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      );
  }
}
}

export default ReportAPet;
