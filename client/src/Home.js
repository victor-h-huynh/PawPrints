import React, { Component } from 'react';
import Map from './Map.js';
import Pets from './Pets.js';
import { Jumbotron } from './Jumbotron'

// AwesomeSocialButtons
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss'

class Home extends Component {

    render() {
        return (
            <div className="home">

              <Jumbotron></Jumbotron>
              <h4>Welcome to Paw Prints</h4>

                <Map updatePetsOnMap={this.props.updatePetsOnMap} pets={this.props.pets} petsOnMap={this.props.petsOnMap} users={this.props.users} addresses={this.props.addresses} userLocation={this.props.userLocation}/>
                <Pets pets={this.props.petsOnMap} users={this.props.users} addresses={this.props.addresses} descriptions={this.props.descriptions}/>

            </div>
      );
    }
};

export default Home;

