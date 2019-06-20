import React, { Component } from 'react';
import Map from './Map.js';

class Home extends Component {

    render() {
        return (
            <div className="App">
            <h1>Users</h1>
              {this.props.users.map(user =>
                <div key={user.id}>{user.name}</div>
              )}
              <h1>Pets</h1>
              {this.props.pets.map(pet =>
                <div key={pet.id}>{pet.name}</div>
              )}
            <Map></Map>
              
            </div>
  
      );
    }
};

export default Home;