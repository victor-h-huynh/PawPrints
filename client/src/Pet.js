import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TimeAgo from 'react-timeago';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'
import { Form } from 'react-bootstrap';

class Pet extends Component {

  state = {
    redirectToCongratulations: false,
    status: this.props.pet.status,
    reunited: ""
  }

petFound = event => {
event.preventDefault()
const date = new Date()
axios
    .put(`http://localhost:3001/api/pets/${this.props.pet.id}`,
    {
      id: this.props.pet.id,
      reunited: date
    })
    .then(response => {
      console.log(response);
      this.setState({
        redirectToCongratulations: true,
        status: response.data.status,
        reunited: date
      });
    })
    .catch(err => {
      console.log('report pet error: ', err);
    });

}

render() {
  const pet = this.props.pet;
  const mapStyles = {
    width: '75vw',
    height: '200px',
  };
return (




<div className="petProfilePage">

<Form onSubmit={this.petFound}>
<Button variant='primary' type='submit'>
            I found my pet!
          </Button>
          </Form>

            <Card className="pet">
            <Card.Header>{pet.name}</Card.Header>
            <Card.Img className="petPic" variant="top" src={pet.picture} />
            <Card.Body>
              <Card.Title>{pet.name}, a {pet.status} {pet.species} in {pet.address.city}, {pet.address.postal_code}</Card.Title>
              <Card.Title className="StatusIcon">{this.state.status}</Card.Title>
              <Card.Text>
                <p>Breed: {pet.description.breed}</p>
                <p>Colour: {pet.description.colour}</p>
                <p>Sex: {pet.description.sex}</p>
                {!this.state.reunited &&
                <p>{this.state.status} <TimeAgo date={pet.date_lost}/></p>}
                {this.state.reunited &&
                  <p>{this.state.status} <TimeAgo date={this.state.reunited}/></p>}

                <p>Additional description: {pet.description.additional}</p>
                <hr/>
                <p>Contact Info: {pet.user.email}</p>

              </Card.Text>
              <hr></hr>
              <Card.Text>
                  <p>{pet.name} was {pet.status.toLowerCase()} near {pet.address.street_name}, {pet.address.city}:</p>
              </Card.Text>
              <div className="petMap">
                <Map
                    google={this.props.google}
                    zoom={15}
                    initialCenter={{
                    lat: Number(pet.latitude),
                    lng: Number(pet.longitude),
                    }}
                    style={mapStyles}>
                    < Marker
                    options={{ icon:
                { url: pet.picture_merged,
                  scaledSize: { width: 48, height: 48 },
                  } }}/>
                  </Map>
                </div>
              <hr></hr>
              <Button variant="success">Edit</Button>
            </Card.Body>
          </Card>
          </div>
    )
   }
}

 export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Pet);