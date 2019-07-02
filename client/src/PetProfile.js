import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Pet from './Pet';
import CommentBox from './CommentBox'
import NoMatch from './NoMatch';
import ReactToPrint from 'react-to-print';


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
        return (
          <React.Fragment>
          {pet ? (
            <React.Fragment>
            <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
            <Pet current_user={this.props.current_user} pet={pet} users={this.props.users} removeAPet={this.props.removeAPet} changeStatus={this.props.changeStatus} ref={el => (this.componentRef = el)}/><div id="comments">
            <CommentBox pet_id={pet.id} current_user={this.props.current_user} users={this.props.users}/></div>
            </React.Fragment>
          ) : (
            <NoMatch/>
          )}
          </React.Fragment>

      );
    }
};

export default PetProfile;