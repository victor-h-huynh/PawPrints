import React, { Component } from 'react';

class PetProfile extends Component {

    getPet() {       
        const id = Number(this.props.match.params.id);
        const pets = this.props.pets;
        const pet = pets.filter(pet => pet.id === id);
        return pet[0];
    } 

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        const pets = this.props.pets;
        const pet = pets.filter(pet => pet.id === id);
        console.log("PROP", pets, pet, id);
    }

    render() {
        const pet = this.getPet();
        return (
            <div className="Pet">
           <h1>{pet.name}</h1>
          </div>
  
      );
    }
};

export default PetProfile;