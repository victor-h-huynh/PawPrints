import React, { Component } from 'react';
import Map from './Map.js';
import { Route } from 'react-router-dom'
import Navbar from './Navbar.js';

class Home extends Component {

    render() {
        return (
            <div className="App">
              <Navbar></Navbar>
            <h1>Users</h1>
              {this.props.users.map(user =>
                <div key={user.id}>{user.name}</div>
              )}
              <h1>Pets</h1>
              {this.props.pets.map(pet =>
                <div key={pet.id}>{pet.name}</div>
              )}
            <Route exact path="/" render={props => <Map {...props} pets={this.props.pets} users={this.props.users} addresses={this.props.addresses}/>}/>

            </div>
  
      );
    }
};

export default Home;