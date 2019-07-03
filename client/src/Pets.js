import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import TimeAgo from 'react-timeago';
import InfiniteScroll from 'react-infinite-scroll-component';

class Pets extends Component {

    state = {
      items: Array.from({ length: 20 }),
      hasMore: true,
      redirect: false,
      pet_id: 0
    };

    fetchMoreData = () => {
      if (this.state.items.length >= 500) {
        this.setState({ hasMore: false });
        return;
      }
    };

    handleSubmit = (id) => {
       this.setState({
        redirect: true,
        pet_id: id
       })
      }

    render() {

       if (this.state.redirect) {
       return <Redirect to={`/pets/${this.state.pet_id}`}/>;
     }
      return (
        <InfiniteScroll dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore={this.state.hasMore}
        height={610}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
            <div className="Pets">
            {this.props.pets.map(pet =>
              <section key={pet.id}>

                <article onClick={event => this.handleSubmit(pet.id)} className="petcard">

                  <div className="image">
                    <img key={pet.id} src={pet.picture} alt=""/>
                  </div>
            
                    <div className="fixcontainer">

                      <div className="fixtext">
                        <h1 className={`fixcard-title ${pet.status}`}>{pet.status} {pet.species}</h1>
                        <p className="fixmeta"> {pet.status} <TimeAgo date={pet.date_lost}/></p>
                        <p className="fix">Name: {pet.name}</p>
                        <p>Colour: {pet.description.colour}</p>
                      </div>

                    </div>

                  </article>
                </section>
          )}
          </div>
          </InfiniteScroll>

      );
    }
};

export default Pets;