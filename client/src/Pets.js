import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago';
import InfiniteScroll from 'react-infinite-scroll-component';

class Pets extends Component {

    state = {
      items: Array.from({ length: 20 }),
      hasMore: true
    };

    fetchMoreData = () => {
      if (this.state.items.length >= 500) {
        this.setState({ hasMore: false });
        return;
      }
    };

    render() {
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

                <article className="card">

                  <div className="image">
                    <img key={pet.id} src={pet.picture} alt=""/>
                  </div>
            
                    <div className="fixcontainer">

                      <div className="fixtext">
                        <h1 className={`fixcard-title ${pet.status}`}>{pet.status} {pet.species}</h1>
                        <p className="fixmeta"> <TimeAgo date={pet.date_lost}/></p>
                        <p className="fix">{pet.name}</p>
                        <Link to={`/pets/${pet.id}`} className="scroll btn-primary">more details</Link>
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