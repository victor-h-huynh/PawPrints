import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";


class Map extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }
  state = {
    pets: this.props.pets,
    markerId: null
  }

  onMarkerClick = (id) => {
    this.setState({
      markerId: id
    })
  }

  renderMarkers() {
  return this.props.pets.map(pet => {
    return (

    <Marker

      key={pet.id}
      position = {{lat: Number(pet.address.latitude), lng: -(Number(pet.address.longitude))}}
      name = {pet.name}
      onClick={() => this.onMarkerClick(pet.id)}
      title = "test"

       >
        {this.state.markerId === pet.id && <InfoWindow >
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


return (
<MyMapComponent
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtBq7JJA3X8tnZT8n6HEPXuqSuDf4AsOQ"
  loadingElement={<div style={{ height: `70vh`, width: `70vw`, margin: 'auto' }} />}
  containerElement={<div style={{ height: `70vh`, width: `70vw`, margin: 'auto' }} />}
  mapElement={<div style={{ height: `70vh`, width: `70vw`, margin: 'auto' }} />}

>
{this.renderMarkers()}
</MyMapComponent>
)

  }

}



const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 45.50, lng: -73.56 }}
  >
    {props.children}
  </GoogleMap>
))


export default Map;

