import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'

class Pets extends Component {

    render() {
        return (
            <div className="Pets">
            {this.props.pets.map(pet =>
            <section key={pet.id}>
            <div className="container">
              <div className="card">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-block">
                      <h4 className="card-title">{pet.name}, {pet.status}</h4>
                      <p className="card-text">{pet.species}</p>
                      <TimeAgo date={pet.date_lost}/>
                      <p className="card-text">{pet.address.street_number} {pet.address.street_name}</p>
                      <p className="card-text">{pet.address.apartment}</p>
                      <p className="card-text">{pet.address.city}</p>
                      <p className="card-text">{pet.address.province} {pet.address.postal_code}</p>
                      
                      <Link to={`/pets/${pet.id}`} className="btn btn-primary">See Pet</Link>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card-img-bottom">
                    <img key={pet.id} src={pet.picture} alt=""/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}
          </div>
  
      );
    }
};

export default Pets;