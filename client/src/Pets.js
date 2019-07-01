import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Badge } from 'react-bootstrap';

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
        height={500}
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
  <div className="entry">
    <div className="container">
      <div className="text">
        <h1 className="card-title">{pet.name}</h1>
        <span className="meta"> <TimeAgo date={pet.date_lost}/></span>
        <span className={`badge-${pet.status}`}>{pet.status}</span>
        {/* <Badge pill variant="danger" className="button button3">{pet.status}</Badge> */}
        <p>{pet.species}, {pet.description.breed} </p> <Link to={`/pets/${pet.id}`} className="btn btn-primary">more details</Link>
      </div>
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