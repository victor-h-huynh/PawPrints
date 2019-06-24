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

    };
  }


  updatePetsOnMap = (petsOnMap) => {
    this.setState({
      petsOnMap: petsOnMap
    })
  }

  componentDidMount() {
    axios.all([
      axios.get('http://localhost:3001/api/addresses.json'),
      axios.get('http://localhost:3001/api/pets.json'),
      axios.get('http://localhost:3001/api/users.json'),
      axios.get('http://localhost:3001/api/descriptions.json'),
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

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    } else {
    return (
          <Switch>
              <Route exact path="/" render={props => <Home {...props} updatePetsOnMap={this.updatePetsOnMap} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses} petsOnMap={this.state.petsOnMap}/>}/>
              <Route path="/ReportAPet" component={ReportAPet}/>
              <Route path="/Success" component={Success}/>
              <Route path="/Login" component={Login}/>
              <Route path="/Register" component={Register}/>
              <Route path="/Pets/:id" render={props => <PetProfile {...props} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses}/>}/>
          </Switch>
    );
    }
  }
}

export default App;
