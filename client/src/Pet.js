import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TimeAgo from 'react-timeago';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  Circle
} from 'react-google-maps';
import axios from 'axios';
import { Form, Badge } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import PetTemplate from './PetTemplate.js';

class Pet extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    current_user: '',
    pending: '',
    redirectToCongratulations: false,
    status: '',
    reunited: '',
    button: false,
    print: false
  };

  componentDidMount() {
    this.setState({
      current_user: this.props.current_user,
      pending: this.props.pet.pending,
      status: this.props.pet.status,
      reunited: this.props.pet.date_reunited
    });
  }

  petReunited = event => {
    event.preventDefault();
    const previousPending = this.props.pending;
    if (previousPending) {
    previousPending.length = 0;
    }

    const date = new Date();
    axios
      .put(`http://localhost:3001/api/pets/${this.props.pet.id}`, {
        update: 1,
        id: this.props.pet.id,
        reunited: date,
        pending: previousPending
      })
      .then(response => {
        this.setState({
          redirectToCongratulations: true,
          status: response.data.status,
          reunited: response.data.date_reunited
        }, () => console.log('==>',this.state));
      })
      .catch(err => {
        console.log('report pet error: ', err);
      });
    this.props.removeAPet();
  };

  petFound = event => {
    event.preventDefault();
    const previousPending = this.props.pet.pending;
    const newPending = [...previousPending, this.props.current_user.id];

    //send notification
    const petOwner = this.props.pet.user;
    console.log(petOwner);
    if (petOwner.alerts === true) {
      axios.post('/api/user_notification', {
        id: petOwner.id,
        message: `Another user thinks they have found your pet!`,
        URL: `http:localhost/users${petOwner.id}`
      });
    }

    axios
      .put(`http://localhost:3001/api/pets/${this.props.pet.id}`, {
        update: 2,
        id: this.props.pet.id,
        pending: newPending
      })
      .then(response => {
        console.log(response);
        this.setState({
          pending: response.data.pending
        });
      })
      .catch(err => {
        console.log('report pet error: ', err);
      });
  };

  notMyPet = (event, id) => {
    event.preventDefault();

    const previousPending = this.state.pending;
    const userIndex = previousPending.findIndex(element => element === id);
    previousPending.splice(userIndex, 1);

    //Send notification
    const helpfulUser = this.props.users.filter(el => el.id === id);
    if (helpfulUser[0].alerts === true) {
      axios.post('/api/user_notification', {
        id: id,
        message: `Sorry, the pet you found is not ${this.props.pet.name}`,
        URL: `http:localhost/users${id}`
      });
    }

    axios
      .put(`http://localhost:3001/api/pets/${this.props.pet.id}`, {
        update: 3,
        id: this.props.pet.id,
        pending: previousPending
      })
      .then(response => {
        this.setState({
          pending: response.data.pending
        });
      })
      .catch(err => {
        console.log('report pet error: ', err);
      });
  };

  someoneFoundMyPet = (event, id) => {
    event.preventDefault();
    const previousPending = this.state.pending;
    previousPending.length = 0;
    const previousPoints = this.props.current_user.points;
    const newPoints = previousPoints + 1500;
    const date = new Date();

    //send notification
    const helpfulUser = this.props.users.filter(el => el.id === id);
    if (helpfulUser[0].alerts === true) {
      axios.post('/api/user_notification', {
        id: id,
        message: `The pet you found is ${
          this.props.pet.name
        }! Congratulations!`,
        URL: `http:localhost/users${id}`
      });
    }

    axios
      .put(`http://localhost:3001/api/pets/${this.props.pet.id}`, {
        update: 4,
        id: this.props.pet.id,
        pending: previousPending,
        reunited: date,
        status: 'Reunited'
      })
      .then(response => {
        console.log(response)
        this.setState({
          redirectToCongratulations: true,
          status: response.data.status,
          reunited: response.data.date_reunited,
          pending: response.data.pending
        });
      })
      .catch(err => {
        console.log('report pet error: ', err);
      });

    axios
      .put(`http://localhost:3001/api/users/${id}`, {
        update: 1,
        id: id,
        points: newPoints
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log('report pet error: ', err);
      });

      this.props.removeAPet();
  };

  thisIsMyPet = event => {
    event.preventDefault();

    const previousPending = this.state.pending;
    previousPending.length = 0;
    const givePointsTo = this.props.users.filter(
      el => el.id === this.props.pet.user_id
    );
    const previousPoints = givePointsTo[0].points;
    const newPoints = previousPoints + 1500;
    const date = new Date();

    if (givePointsTo[0].alerts === true) {
      axios.post('/api/user_notification', {
        id: this.props.pet.user_id,
        message: `The pet you found is ${
          this.props.pet.name
        }! Congratulations!`,
        URL: `http:localhost/users${this.props.pet.user_id}`
      });
    }

    axios
      .put(`http://localhost:3001/api/pets/${this.props.pet.id}`, {
        update: 5,
        id: this.props.pet.id,
        pending: previousPending,
        reunited: date,
        status: 'Reunited'
      })
      .then(response => {
        this.props.removeAPet();
        this.setState({
          redirectToCongratulations: true,
          status: response.data.status,
          reunited: response.data.date_reunited,
          pending: response.data.pending,
        });
      })
      .catch(err => {
        console.log('report pet error: ', err);
      });


    axios
      .put(`http://localhost:3001/api/users/${this.props.pet.user_id}`, {
        update: 1,
        id: this.props.pet.user_id,
        points: newPoints
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log('report pet error: ', err);
      });
      this.props.removeAPet();

  };

  renderButtons = () => {
    if (this.state.status === 'Reunited') {
      return;
    }

    if (this.state.current_user.id === this.props.pet.user_id) {
      if (this.state.pending) {
        const userNamesArray = [];
        const buttons = this.state.pending.map((id, index) => {
          for (let user of this.props.users) {
            if (user.id === id) {
              userNamesArray.push(user.name);
            }
          }

          return (
            <React.Fragment>
              <div>
                {userNamesArray[index]} thinks he may have found your pet{' '}
              </div>
              <React.Fragment>
                <Form onSubmit={event => this.someoneFoundMyPet(event, id)}>
                  <Button variant='primary' type='submit'>
                    Yes! This is my pet!
                  </Button>
                </Form>
                <Form onSubmit={event => this.notMyPet(event, id)}>
                  <Button variant='primay' type='submit'>
                    No! This isn't my pet
                  </Button>
                </Form>
              </React.Fragment>
            </React.Fragment>
          );
        });
        return (
          <div>
            {!this.state.reunited && (
              <Form onSubmit={this.petReunited}>
                <Button variant='primary' type='submit'>
                  I found my pet!
                </Button>
              </Form>
            )}
            {buttons}{' '}
          </div>
        );
      }
    }  else if (this.state.pending.includes(this.state.current_user.id) && this.state.current_user.id !== this.props.pet.user_id) {
      return (
      <React.Fragment>
        <Form onSubmit={this.petFound}>
          <Button variant='primary' type='submit' disabled>
            I think I found your pet!
          </Button>
        </Form>
        {this.state.status === "Found" &&
        <Form onSubmit={this.thisIsMyPet}>
          <Button variant='primary' type='submit'>
            This is my pet!
          </Button>
        </Form>}
        </React.Fragment>
      );
    } else if (!this.state.pending.includes(this.state.current_user.id) && this.state.current_user.id !== this.props.pet.user_id) {
      return (
      <React.Fragment>
        <Form onSubmit={this.petFound}>
          <Button variant='primary' type='submit'>
            I think I found your pet!
          </Button>
        </Form>
        {this.state.status === "Found" &&
        <Form onSubmit={this.thisIsMyPet}>
          <Button variant='primary' type='submit'>
            This is my pet!
          </Button>
        </Form>}
        </React.Fragment>
      );
    }
  };

  render() {
    // const mapStyles = {
    //   width: '80vw',
    //   height: '200px'
    // };

    const pet = this.props.pet;

    const timeLost = new Date(pet.date_lost).getTime();
    const timeNow = Date.now();
    const daySinceLost = Math.floor((timeNow - timeLost) / 86400000);
    let radius = 200 + daySinceLost * 200;
    if (radius > 1500) {
      radius = 1500;
    }

    return (
      <div className='petProfilePage'>
        <Card className='pet'>
          <Card.Img className='petPic' variant='top' src={pet.picture} />

          <Card.Body>
            <div className='petinfo'>
              <Card.Title>
              {pet.date_reunited ? (
                <h1 class={`badge-${pet.status}`}>{pet.status} {pet.species}</h1>
              ) : (
                <h1 class={`badge-${this.state.status}`}>{this.state.status} {pet.species}</h1>
              )}
              </Card.Title>
            </div>
            <Card.Text>
              <p>Name: {pet.name}</p>
              <p>Breed: {pet.description.breed}</p>
              <p>Colour: {pet.description.colour}</p>
              <p>Sex: {pet.description.sex}</p>
              {!this.state.reunited && (
                <p>
                  {this.state.status}: <TimeAgo date={pet.date_lost} />
                </p>
              )}
              {this.state.reunited && (
                <p>
                  {this.state.status}: <TimeAgo date={this.state.reunited} />
                </p>
              )}

              <p>Additional description: {pet.description.additional}</p>
              <hr />
              <p>Contact Info: {pet.user.email}</p>
              <hr />
            </Card.Text>
            <Card.Text>
              <span>
                {pet.name} was {pet.status.toLowerCase()} near{' '}
                {pet.address.street_name}, {pet.address.city}:
              </span>
            </Card.Text>
            <div className='petMap'>
              <MyMapComponent
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                  process.env.REACT_APP_GOOGLE_API_KEY
                }`}
                loadingElement={<div className='loading' />}
                containerElement={
                  <div className='petMap' />
                }
                mapElement={
                  <div style={{ height: '100%' }} className={'map'} />
                }
                setMapRef={this.setMapRef}
                pet={this.props.pet}
              >
                <Marker
                  setMarkerRef={this.setMarkerRef}
                  key={pet.id}
                  position={{
                    lat: Number(pet.latitude),
                    lng: Number(pet.longitude)
                  }}
                  name={pet.name}
                  options={{
                    icon: {
                      url: pet.picture_merged,
                      scaledSize: { width: 48, height: 48 }
                    }
                  }}
                >
                  {pet.status === 'Lost' && (
                    <Circle
                      options={{
                        visible: true,
                        radius: radius,
                        fillColor: '#84bcaf',
                        strokeOpacity: 0,
                        fillOpacity: 0.4,
                        center: {
                          lat: Number(pet.latitude),
                          lng: Number(pet.longitude)
                        }
                      }}
                    />
                  )}
                </Marker>
              </MyMapComponent>
            </div>
            <hr />
            {this.state.current_user && this.renderButtons()}

          </Card.Body>
        </Card>
      </div>


    );
  }
}

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      ref={props.setMapRef}
      defaultZoom={15}
      defaultCenter={{
        lat: Number(props.pet.latitude),
        lng: Number(props.pet.longitude)
      }}
      onIdle={props.onMapIdle}
    >
      {props.children}
    </GoogleMap>
  ))
);

export default Pet;

//   spotted :
// {
//   uid1 : {
//     userId:XX,
//     uid: uid1,
//     status: pending | confirm | wrong
//   }
// }


// <ReactToPrint
//               trigger={() => <a href='#'>Print this out!</a>}
//               content={() => this.componentRef}
//             />
//             <PetTemplate
//               print={this.props.print}
//               current_user={this.props.current_user}
//               pet={pet}
//               users={this.props.users}
//               removeAPet={this.props.removeAPet}
//               ref={el => (this.componentRef = el)}
//             />

      //     return (
      //       <div className='petProfilePage'>
      //         <Card className='pet'>
      //           <Card.Img className='petPic' variant='top' src={pet.picture} />
      //           <Card.Body>
      //             <div className='petinfo'>
      //               <Card.Title>
      //                 A {pet.status} {pet.species} in {pet.address.city}
      //               </Card.Title>
      //               <span className={`badge-${pet.status}`}>
      //                 {pet.status}
      //               </span>
      //             </div>
      //             <Card.Text>
      //               <p>Name: {pet.name}</p>
      //               <p>Breed: {pet.description.breed}</p>
      //               <p>Colour: {pet.description.colour}</p>
      //               <p>Sex: {pet.description.sex}</p>
      //               {!pet.date_reunited && (
      //                 <p>
      //                   {this.state.status} <TimeAgo date={pet.date_lost} />
      //                 </p>
      //               )}
      //               {pet.date_reunited && (
      //                 <p>
      //                   {this.state.status} <TimeAgo date={pet.date_reunited} />
      //                 </p>
      //               )}

      //               <p>Additional description: {pet.description.additional}</p>
      //               <hr />
      //               <p>Contact Info: {pet.user.email}</p>
      //               <hr />
      //             </Card.Text>
      //             <Card.Text>
      //               <span>
      //                 {pet.name} was {pet.status.toLowerCase()} near{' '}
      //                 {pet.address.street_name}, {pet.address.city}:
      //               </span>
      //             </Card.Text>
      //             <div className='petMap'>
      //               <Map
      //                 google={this.props.google}
      //                 zoom={15}
      //                 initialCenter={{
      //                   lat: Number(pet.latitude),
      //                   lng: Number(pet.longitude)
      //                 }}
      //                 style={mapStyles}
      //               >
      //                 <Marker
      //                   options={{
      //                     icon: {
      //                       url: pet.picture_merged,
      //                       scaledSize: { width: 48, height: 48 }
      //                     }
      //                   }}
      //                 />
      //               </Map>
      //             </div>
      //             <br></br>
      //             <hr/>
      //             {this.state.current_user && this.renderButtons()}
      //             <ReactToPrint
      //               trigger={() => <a href='#'>Print this out!</a>}
      //               content={() => this.componentRef}
      //             />
      //             <PetTemplate
      //               print={this.props.print}
      //               current_user={this.props.current_user}
      //               pet={pet}
      //               users={this.props.users}
      //               removeAPet={this.props.removeAPet}
      //               ref={el => (this.componentRef = el)}
      //             />
      //           </Card.Body>
      //         </Card>
      //       </div>