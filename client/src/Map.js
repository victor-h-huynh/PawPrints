
import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose"



const mapStyles = {
  width: '60vw',
  height: '70vh'
};




class Map extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }
  state = {
    pets: this.props.pets
  }

  //Make showINfo function returning InfoWindow
  //OnClick => {}


  renderMarkers(props2) {
  return this.props.pets.map(pet => {
    return (

    <Marker

      key={pet.id}
      position = {{lat: Number(pet.address.latitude), lng: -(Number(pet.address.longitude))}}
      name = {pet.name}
      onClick={props2.onToggleOpen}
      title = "test"

       >
        {props2.isOpen && <InfoWindow onCloseClick={props2.onToggleOpen}>
        <h4>{pet.name}</h4>
        </InfoWindow>}
         </Marker>
         )
  })
}

componentDidMount() {
  console.log(this.state)
}

  render() {
    const GoogleMapExample = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props2 => (
        <GoogleMap
          ref={map => {
            this.map = map;
          }}
          onIdle={props2.onMapIdle}
          defaultCenter={{ lat: 45.50, lng: -73.56 }}
          defaultZoom={11}
        >
          {this.renderMarkers(props2)}
        </GoogleMap>
      ))

    return (
      <div>
        <GoogleMapExample
          onMapIdle={() => {
            let ne = this.map.getBounds().getNorthEast();
            let sw = this.map.getBounds().getSouthWest();
            console.log(ne.lat() + ";" + ne.lng());
            console.log(sw.lat() + ";" + sw.lng());
          }}

          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZo4EZUupTl2upWKh2W7xWD_12ixbr8PU"
          loadingElement={<div style={{ height: `70vh`, width: `70vw` }} />}
          containerElement={<div style={{ height: `70vh`, width: `70vw` }} />}
          mapElement={<div style={{ height: `70vh`, width: `70vw` }} />}


        />
      </div>
    );
  }
}

export default Map;
