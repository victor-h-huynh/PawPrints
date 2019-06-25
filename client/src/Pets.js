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
      // a fake async api call like which sends
      // 20 more records in .5 secs
      // setTimeout(() => {
      //   this.setState({
      //     items: this.state.items.concat(Array.from({ length: 20 }))
      //   });
      // }, 500);
    };

    render() {
      return (
        <InfiniteScroll dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore={this.state.hasMore}
        height={600}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
            <div className="Pets">
            {this.props.pets.map(pet =>
          //   <section key={pet.id}>
          //   <div className="container">
          //     <div className="card">
          //       <div className="row">
          //         <div className="col-md-6">
          //           <div className="card-block">
          //             <h4 className="card-title">{pet.name}, {pet.status}</h4>
          //             <p className="card-text">{pet.species}</p>
          //             <TimeAgo date={pet.date_lost}/>
          //             <p className="card-text">{pet.description.breed}</p>
          //             <p className="card-text">{pet.address.apartment}</p>
          //             <p className="card-text">{pet.address.city}</p>
          //             <p className="card-text">{pet.address.province} {pet.address.postal_code}</p>
          //             <Link to={`/pets/${pet.id}`} className="btn btn-primary">See Pet</Link>
          //           </div>
          //         </div>
          //         <div className="col-md-6">
          //           <div className="card-img-bottom">
          //           <img key={pet.id} src={pet.picture} alt=""/>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </section>
          <section key={pet.id}>

          <article className="card">
  <div className="image">
  <img key={pet.id} src={pet.picture} alt=""/>
  </div>
  <div className="entry">
    <div className="container">
      <div className="text">
        <h1 className="card-title">{pet.name}</h1>
        <span className="meta"> <TimeAgo date={pet.date_lost}/></span><Badge pill variant="danger" className="button button3">{pet.status}</Badge>
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