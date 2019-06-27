import React, { Component } from 'react';
import Map from './Map.js';
import Pets from './Pets.js';
import Navigationbar from './Navigationbar.js';
import { Jumbotron } from './Jumbotron'

// AwesomeSocialButtons
import { AwesomeButtonSocial } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss'

class Home extends Component {

    render() {
        return (
            <div className="Home">
              
              <Jumbotron></Jumbotron>
              <h4>Welcome to Paw Prints</h4>

                <Map updatePetsOnMap={this.props.updatePetsOnMap} pets={this.props.pets} petsOnMap={this.props.petsOnMap} users={this.props.users} addresses={this.props.addresses} userLocation={this.props.userLocation}/>
                <Pets pets={this.props.petsOnMap} users={this.props.users} addresses={this.props.addresses} descriptions={this.props.descriptions}/>

                <AwesomeButtonSocial
                  cssModule={AwesomeButtonStyles}
                  type="facebook"
                  url="https://www.google.ca"
                >
                  Facebook
                </AwesomeButtonSocial>

                <AwesomeButtonSocial
                  cssModule={AwesomeButtonStyles}
                  type="twitter"
                  url="https://www.google.ca"
                >
                  Twitter
                </AwesomeButtonSocial>
                <AwesomeButtonSocial
                  cssModule={AwesomeButtonStyles}
                  type="instagram"
                  url="https://www.instagram.com"
                >
                  Instagram
                </AwesomeButtonSocial>
            </div>
      );
    }
};

export default Home;

