import React, { Component } from 'react';
import Map from './Map.js';
import Pets from './Pets.js';

class Home extends Component {

    render() {
        return (
            <div className="App">
              <h4>Welcome to Paw Prints</h4>
              <div className="Container">
                <Map pets={this.props.pets} users={this.props.users} addresses={this.props.addresses}/>
                <Pets pets={this.props.pets} users={this.props.users} addresses={this.props.addresses}/>
              </div>
            </div>
      );
    }
};

export default Home;