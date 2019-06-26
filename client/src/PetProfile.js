import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Pet from './Pet';
// import Comments from './comments'

class PetProfile extends Component {

    getPet() { 
        const id = Number(this.props.match.params.id);
        const pets = this.props.pets;
        const [pet] = pets.filter(pet => pet.id === id);
        return pet;
    } 

    handleClick = event => {
      event.preventDefault();
      return <Redirect to={`/ReportAPet`}/>
    }
    
    render() {
        const pet = this.getPet();
        const petThere = pet ? <Pet pet={pet}/> : <div>Loading...</div>
        return (
          <div>
          {petThere}
          {/* <div id="comments"><Comments /></div> */}
          </div>
          
      );
    }
};

export default PetProfile;