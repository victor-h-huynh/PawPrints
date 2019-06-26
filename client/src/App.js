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
import Navigationbar from './Navigationbar.js'


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
      current_user: null
    };
  }

  updatePetsOnMap = (petsOnMap) => {
    this.setState({
      petsOnMap: petsOnMap
    })
  }

  updateToken = (token) => {
    this.setState({
      token: token
    })
  }

  componentDidMount() {
    axios.all([
      axios.get('/api/current_user').catch(() => null),
      axios.get('/api/addresses.json'),
      axios.get('/api/pets.json'),
      axios.get('/api/users.json'),
      axios.get('/api/descriptions.json'),
    ])
    .then(axios.spread((user, addressesRes, petsRes, usersRes, descriptionsRes) => {
      console.log('user', user);
      this.setState({
        addresses: addressesRes.data,
        pets: petsRes.data,
        users: usersRes.data,
        descriptions: descriptionsRes.data,
        current_user: user.data
      })
    }))
    .then(res => {
      this.setState({
        loading:false
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

    if (this.state.loading) {
      return <h1>Loading...</h1>;
    } else {
    return (
      <React.Fragment>
      <Navigationbar current_user={this.state.current_user} />
      <Switch>
              <Route exact path="/" render={props => <Home {...props} updatePetsOnMap={this.updatePetsOnMap} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses} petsOnMap={this.state.petsOnMap}/>}/>
              <Route path="/ReportAPet" render={props => <ReportAPet {...props} addAPet={this.addAPet}/>}/>
              <Route path="/Login" render={props => <Login {...props} updateToken={this.updateToken} token={this.state.token}/>}/>
              <Route path="/Register" render={props => <Register {...props} addAUser={this.addAUser}/>}/>
              <Route path="/Pets/:id" render={props => <PetProfile {...props} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses}/>}/>
              <Route path="/Success" component={Success}/>
          </Switch>
          </React.Fragment>
    );
    }
  }
}


export default App;
