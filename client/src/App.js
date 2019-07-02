import axios from 'axios';
import React, { Component } from 'react';
import './App.scss';
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';
import Success from './Success.js';
import UserProfile from './UserProfile';
import { Switch, Route } from 'react-router-dom';
import ReportAPet from './ReportAPet.js';
import PetProfile from './PetProfile.js';
import Navigationbar from './Navigationbar.js';
import { PrivateRoute }  from './PrivateRoute';
import NoMatch from './NoMatch';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users:[],
      pets:[],
      petsOnMap: [],
      addresses: [],
      token: localStorage.getItem('token'),
      current_user: null,
      userLocation: { lat: 45.50, lng: -73.59 },
    };
  }

  updatePetsOnMap = (petsOnMap) => {
    this.setState({
      petsOnMap: petsOnMap
    })
  }

  clearCurrentUser = () => {
    this.setState({current_user: null, token: null})
  }



  updateToken = (token) => {
    axios.get('/api/current_user').then(current_user => {
      this.setState({
        token,
        current_user: current_user.data
      })

    })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
			position => {
			  const { latitude, longitude } = position.coords;
			  const newUserLocation = Object.assign({}, this.state.userLocation);
			  newUserLocation.lat = latitude;
			  newUserLocation.lng = longitude;
			  this.setState(() => ({userLocation: newUserLocation}));
			},
		);
    axios.all([
      axios.get('/api/current_user').catch(() => ({data: null})),
      axios.get('/api/addresses.json'),
      axios.get('/api/pets.json'),
      axios.get('/api/users.json'),
      axios.get('/api/descriptions.json'),
    ])
    .then(axios.spread((user, addressesRes, petsRes, usersRes, descriptionsRes) => {
      this.setState({
        addresses: addressesRes.data,
        pets: this.filterReunited(petsRes.data),
        users: usersRes.data,
        descriptions: descriptionsRes.data,
        current_user: user.data,
      })
    }))
    .then(res => {
      setTimeout(() => { this.setState({
        loading:false,
      })}, 300)
    })
    .catch(error => console.log(error));
  }

updateNavState = name => {
  this.setState({
    current_user: {...this.state.current_user,
      name: name}
  })
}

  addAPet = (newPet) => {
    this.setState({pets: [newPet, ...this.state.pets]})
  }

  addAUser = (newUser) => {
    this.setState({users: [...this.state.users, newUser]})
  }

  removeAPet = (reunitedPet) => {
    const newPets = this.state.pets.filter(pet => pet.id !== reunitedPet.id);
    console.log(newPets);
    this.setState({petsOnMap: newPets})
  }

  filterReunited = (allPets) => {
    const lostPets = allPets.filter(pet => pet.status !== "Reunited");
    console.log(lostPets);
    return lostPets
  }

  changeStatus = (pet) => {
    this.setState({status: pet.status});
  }




  render() {

    if (this.state.loading) {
      return (
    <React.Fragment>
<div className="paw-print-1">
    <div className="pad large"></div>
    <div className="pad small-1"></div>
    <div className="pad small-2"></div>
    <div className="pad small-3"></div>
    <div className="pad small-4"></div>
</div>

<div className="paw-print-2">
    <div className="pad large"></div>
    <div className="pad small-1"></div>
    <div className="pad small-2"></div>
    <div className="pad small-3"></div>
    <div className="pad small-4"></div>
</div>

<div className="paw-print-3">
    <div className="pad large"></div>
    <div className="pad small-1"></div>
    <div className="pad small-2"></div>
    <div className="pad small-3"></div>
    <div className="pad small-4"></div>
</div>

<div className="paw-print-4">
    <div className="pad large"></div>
    <div className="pad small-1"></div>
    <div className="pad small-2"></div>
    <div className="pad small-3"></div>
    <div className="pad small-4"></div>
</div>

<div className="paw-print-5">
    <div className="pad large"></div>
    <div className="pad small-1"></div>
    <div className="pad small-2"></div>
    <div className="pad small-3"></div>
    <div className="pad small-4"></div>
</div>

<div className="paw-print-6">
    <div className="pad large"></div>
    <div className="pad small-1"></div>
    <div className="pad small-2"></div>
    <div className="pad small-3"></div>
    <div className="pad small-4"></div>
</div>

<div className="paw-print-7">
    <div className="pad large"></div>
    <div className="pad small-1"></div>
    <div className="pad small-2"></div>
    <div className="pad small-3"></div>
    <div className="pad small-4"></div>
</div>

<div className="paw-print-8">
    <div className="pad large"></div>
    <div className="pad small-1"></div>
    <div className="pad small-2"></div>
    <div className="pad small-3"></div>
    <div className="pad small-4"></div>
</div>

    </React.Fragment>
    )
    } else {
    return (
      <React.Fragment>
        <Navigationbar current_user={this.state.current_user} clearCurrentUser={this.clearCurrentUser}/>
        <Switch>
              <Route exact path="/" render={props => <Home {...props} updatePetsOnMap={this.updatePetsOnMap} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses} petsOnMap={this.state.petsOnMap} userLocation={this.state.userLocation}/>}/>

              <PrivateRoute path="/ReportAPet" component={ReportAPet} addAPet={this.addAPet} userLocation={this.state.userLocation} current_user={this.state.current_user} />

              <Route path="/Login" render={props => <Login {...props} updateToken={this.updateToken} token={this.state.token}/>}/>
              <Route path="/Register" render={props => <Register {...props} addAUser={this.addAUser} updateToken={this.updateToken} token={this.state.token}/>}/>
              <Route path="/Pets/:id" render={props => <PetProfile {...props} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses} current_user={this.state.current_user} removeAPet={this.removeAPet} changeStatus={this.changeStatus}/>}/>
              <Route path="/Users/:id" render={props => <UserProfile {...props} pets={this.state.pets} users={this.state.users} current_user={this.state.current_user} updateNavState={this.updateNavState} addresses={this.state.addresses}/>}/>
              <Route path="/Success" component={Success}/>
              <Route component={NoMatch}/>
          </Switch>
      </React.Fragment>
    );
    }
  }
}


export default App;


