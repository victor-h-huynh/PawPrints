import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';




class MapContainer extends Component {



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
        {this.renderInfoWindow()}

      </Map>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);

