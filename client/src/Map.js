import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';


const mapStyles = {
  width: '70vw',
  height: '70vh'
};

class MapContainer extends Component {
   state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  renderMarkers() {
  return this.props.addresses.map(address => {
    return <Marker
      key={address.id}
      // onClick = { this.onMarkerClick }
      position = {{lat: Number(address.latitude), lng: -(Number(address.longitude))}}
      name = {address.name} />
  })
}

  componentDidMount() {
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

        <div>
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </div>
      </Map>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);

