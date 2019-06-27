import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TimeAgo from 'react-timeago';
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
                    zoom={15}
                    initialCenter={{
                    lat: Number(pet.latitude),
                    lng: Number(pet.longitude),
                    }}
                    style={mapStyles}>
                    < Marker
                    options={{ icon:
                { url: pet.picture_merged,
                  scaledSize: { width: 36, height: 36 },
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