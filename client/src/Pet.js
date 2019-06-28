import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TimeAgo from 'react-timeago';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'
import { Form } from 'react-bootstrap';

class Pet extends Component {

  state = {
    current_user: '',
    pending: '',
    redirectToCongratulations: false,
    status: '',
    reunited: "",
    button: false
  }

componentDidMount() {

    this.setState({
      current_user: this.props.current_user.id,
      pending: this.props.pet.pending,
      status: this.props.pet.status,
      reunited: this.props.pet.date_reunited,
    })
  }

petReunited = event => {
event.preventDefault()
const date = new Date()
axios
    .put(`http://localhost:3001/api/pets/${this.props.pet.id}`,
    {
      update: 1,
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

petFound = event => {
  event.preventDefault()
  const previousPending = this.props.pet.pending
  const newPending = [...previousPending, this.props.current_user.id]

  axios
    .put(`http://localhost:3001/api/pets/${this.props.pet.id}`,
    {
      update: 2,
      id: this.props.pet.id,
      pending: newPending,
    })
    .then(response => {
      console.log(response);
      this.setState({
        pending: response.data.pending
      })
    })
    .catch(err => {
      console.log('report pet error: ', err);
    });

}



notMyPet = (event, id) => {
  event.preventDefault()
//Send notification?
  const previousPending = this.state.pending
  const userIndex = previousPending.findIndex(element => element === id)
  previousPending.splice(userIndex, 1)


  axios
    .put(`http://localhost:3001/api/pets/${this.props.pet.id}`,
    {
      update: 3,
      id: this.props.pet.id,
      pending: previousPending,
    })
    .then(response => {
      console.log(response);
      this.setState({
        pending: response.data.pending
      })
    })
    .catch(err => {
      console.log('report pet error: ', err);
    });

}

someoneFoundMyPet = (event, id) => {
  event.preventDefault()
  const previousPending = this.state.pending
  previousPending.length = 0
  const previousPoints = this.props.current_user.points
  const newPoints = previousPoints + 1500
  const date = new Date()

  axios
    .put(`http://localhost:3001/api/pets/${this.props.pet.id}`,
    {
      update: 4,
      id: this.props.pet.id,
      pending: previousPending,
      reunited: date
    })
    .then(response => {
      console.log(response);
      this.setState({
        redirectToCongratulations: true,
        status: response.data.status,
        reunited: date,
        pending: response.data.pending
      });
    })
    .catch(err => {
      console.log('report pet error: ', err);
    });

  axios
    .put(`http://localhost:3001/api/users/${id}`,
    {
      update: 1,
      id: id,
      points: newPoints,
    })
    .then(response => {
      console.log(response);

    })
    .catch(err => {
      console.log('report pet error: ', err);
    });

}


renderButtons = () => {

  if (this.state.status === "Reunited") {
    return;
  }

  if (this.state.current_user === this.props.pet.user_id){
    if(this.state.pending) {
    const userNamesArray = []
        const buttons = this.state.pending.map((id, index) => {
        for (let user of this.props.users) {
           if (user.id === id) {
            userNamesArray.push(user.name)
           }
        }

    return (
            <React.Fragment>
            <div>
            {userNamesArray[index]} thinks he may have found your pet </div>
            <React.Fragment>
            <Form onSubmit={(event) => this.someoneFoundMyPet(event, id)}>
            <Button variant='success' type='submit'>
             This guy found my pet!
            </Button>
            </Form>
            <Form onSubmit={(event) => this.notMyPet(event, id)}>
            <Button variant='warning' type='submit'>
            Not my pet
            </Button>
            </Form>
            </React.Fragment>
            </React.Fragment>

      )
    })
    return (<div>
            {!this.state.reunited && <Form onSubmit={this.petReunited}>
            <Button variant='primary' type='submit'>
            I found my pet!
            </Button>
            </Form>}

    {buttons} </div>)
  }

  } else if (this.state.pending.includes(this.state.current_user) ){
    return(
            <Form onSubmit={this.petFound}>
            <Button variant='primary' type='submit' disabled>
            I think I found your pet!
            </Button>
            </Form>
            )
  } else if (!this.state.pending.includes(this.state.current_user) ){
    return(
            <Form onSubmit={this.petFound}>
            <Button variant='primary' type='submit' >
            I think I found your pet!
            </Button>
            </Form>
            )
  }

}

render() {
  const pet = this.props.pet;
  const mapStyles = {
    width: '75vw',
    height: '200px',
  };
return (

<div className="petProfilePage">


{this.renderButtons()}

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
                {!pet.date_reunited &&
                <p>{this.state.status} <TimeAgo date={pet.date_lost}/></p>}
                {pet.date_reunited &&
                  <p>{this.state.status} <TimeAgo date={pet.date_reunited}/></p>}

                <p>Additional description: {pet.description.additional}</p>
                <hr/>
                <p>Contact Info: {pet.user.email}</p>

              </Card.Text>
              <hr></hr>
              <Card.Text>
                  <span>{pet.name} was {pet.status.toLowerCase()} near {pet.address.street_name}, {pet.address.city}:</span>
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








//   spotted :
// {
//   uid1 : {
//     userId:XX,
//     uid: uid1,
//     status: pending | confirm | wrong
//   }
// }
