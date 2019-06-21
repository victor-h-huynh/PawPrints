import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';


const mapStyles = {
  width: '70vw',
  height: '70vh',
  margin: 'auto'
};


class MapContainer extends Component {
   state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

    onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  renderMarkers() {
  return this.props.pets.map(pet => {
    return <Marker

      key={pet.id}
      // onClick = { this.onMarkerClick }
      position = {{lat: Number(pet.address.latitude), lng: -(Number(pet.address.longitude))}}
      name = {pet.name}
      onClick = {this.onMarkerClick}
      icon={{url: 'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
        scaledSize: new this.props.google.maps.Size(60, 40)}}
       >
        <InfoWindow
         marker={this.state.activeMarker}
         visible={this.state.showingInfoWindow}
         onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>



      </Marker>




  })
}

  componentDidMount() {

    console.log(this.props.google)


  }

  render() {
    return (
      <div>
      <Map
        google={this.props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={{ lat: 45.50, lng: -73.56 }}
      >
        {this.renderMarkers()}

      </Map>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);

