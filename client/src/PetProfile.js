import React, { Component } from 'react';

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Navigationbar from './Navigationbar.js';
import { Redirect } from 'react-router-dom';
import Pet from './Pet';

class PetProfile extends Component {

    getPet() { 
        const id = Number(this.props.match.params.id);
        const pets = this.props.pets;
        const [pet] = pets.filter(pet => pet.id === id);
        console.log("Pet in getPet: ", pet);
        console.log("Props in getPet: ", this.props);
        return pet;
    } 

    handleClick = event => {
      event.preventDefault();
      return <Redirect to={`/ReportAPet`}/>
    }
    
    render() {
      console.log("Props in pet profile: ", this.props);
        const pet = this.getPet();
        console.log("Pet: ", pet);
        const petThere = pet ? <Pet pet={pet}/> : <div>Loading...</div>
        return (
          <div>
          {petThere}
          </div>
      );
    }
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(PetProfile);