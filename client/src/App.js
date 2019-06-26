import axios from 'axios';
import React, { Component } from 'react';
import './App.scss';
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';
import Success from './Success.js'
import { Switch, Route } from 'react-router-dom';
import ReportAPet from './ReportAPet.js';
import PetProfile from './PetProfile.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users:[],
      pets:[],
      petsOnMap: [],
      addresses:[],
      userLocation: { lat: 45.50, lng: -73.59 },
    };
  }

  updatePetsOnMap = (petsOnMap) => {
    this.setState({
      petsOnMap: petsOnMap
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
      axios.get('/api/addresses.json'),
      axios.get('/api/pets.json'),
      axios.get('/api/users.json'),
      axios.get('/api/descriptions.json'),
    ])
    .then(axios.spread((addressesRes, petsRes, usersRes, descriptionsRes) => {
      this.setState({
        addresses: addressesRes.data,
        pets: petsRes.data,
        users: usersRes.data,
        descriptions: descriptionsRes.data,
      })
    }))
    .then(res => {
      this.setState({
        loading:false,
      })
    })
    .catch(error => console.log(error));
  }

  addAPet = (newPet) => {
    this.setState({pets: [...this.state.pets, newPet]})
  }


  addAUser = (newUser) => {
    this.setState({users: [...this.state.users, newUser]})
  }

  render() {
    console.log("Update", this.state.userLocation)
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    } else {
    return (
          <Switch>
              <Route exact path="/" render={props => <Home {...props} updatePetsOnMap={this.updatePetsOnMap} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses} petsOnMap={this.state.petsOnMap} userLocation={this.state.userLocation}/>}/>
              <Route path="/ReportAPet" render={props => <ReportAPet {...props} addAPet={this.addAPet} userLocation={this.state.userLocation}/>}/>
              <Route path="/Login" component={Login}/>
              <Route path="/Register" render={props => <Register {...props} addAUser={this.addAUser}/>}/>
              <Route path="/Pets/:id" render={props => <PetProfile {...props} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses}/>}/>
              <Route path="/Success" component={Success}/>
          </Switch>
    );
    }
  }
}


export default App;
