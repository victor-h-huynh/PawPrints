import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TimeAgo from 'react-timeago';
import Navigationbar from './Navigationbar.js';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class Pet extends Component {


render() {
  const pet = this.props.pet;
  const mapStyles = {
    width: '75vw',
    height: '200px',
  };
return (
<div className="petProfilePage">
            <Navigationbar></Navigationbar>
            <Card className="pet">
            <Card.Header>{pet.name}</Card.Header>
            <Card.Img className="petPic" variant="top" src={pet.picture} />
            <Card.Body>
              <Card.Title>{pet.name}, a {pet.status} {pet.species} in {pet.address.city}, {pet.address.postal_code}</Card.Title>
              <Card.Title className="StatusIcon">{pet.status}</Card.Title>
              <Card.Text>
                <p>Breed: {pet.description.breed}</p>
                <p>Colour: {pet.description.colour}</p>
                <p>Sex: {pet.description.sex}</p>
                <p>{pet.status} <TimeAgo date={pet.date_lost}/></p>
                <p>Additional description: {pet.description.additional}</p>
              </Card.Text>
              <hr></hr>
              <Card.Text>
                  <p>{pet.name} was {pet.status.toLowerCase()} near {pet.address.street_name}, {pet.address.city}:</p>
              </Card.Text>
              <div className="petMap">
                <Map
                    google={this.props.google}
                    zoom={10}
                    initialCenter={{
                    lat: pet.address.latitude,
                    lng: pet.address.longitude,
                    }}
                    style={mapStyles}>
                    < Marker/>
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
 export default Pet;