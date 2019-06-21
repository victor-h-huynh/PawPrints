import React, { Component } from 'react';
import Map from './Map.js';
import Pets from './Pets.js';
import Navigationbar from './Navigationbar.js';
import { Jumbotron } from './Jumbotron'

class Home extends Component {

    render() {
        return (
            <div className="Home">
              <Navigationbar></Navigationbar>
              <Jumbotron></Jumbotron>
              <h4>Welcome to Paw Prints</h4>
                <Map pets={this.props.pets} users={this.props.users} addresses={this.props.addresses}/>
                <Pets pets={this.props.pets} users={this.props.users} addresses={this.props.addresses} descriptions={this.props.descriptions}/>
            </div>
      );
    }
};

export default Home;