import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";


class Map extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }
  state = {
    markerId: null
  }

  setMapRef = (map) => {
    this.map = map
  }

  onMarkerClick = (id) => {
    if (this.state.markerId === id){
      this.setState({
      markerId: null
      })
    }
    else {
      this.setState({
      markerId: id
    })
    }
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
  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
  loadingElement={<div style={{ height: `70vh`, width: `70vw`, margin: 'auto' }} />}
  containerElement={<div style={{ height: `70vh`, width: `70vw`, margin: 'auto' }} />}
  mapElement={<div style={{ height: `70vh`, width: `70vw`, margin: 'auto' }} />}
  setMapRef={this.setMapRef}
   onMapIdle={() => {
            let ne = this.map.getBounds().getNorthEast();
            let sw = this.map.getBounds().getSouthWest();

            const petOnMapArray = this.props.pets.filter(pet =>

              Number(pet.address.latitude) > sw.lat() &&
                Number(pet.address.latitude) < ne.lat() &&
              -Number(pet.address.longitude) > sw.lng() &&
              -Number(pet.address.longitude) < ne.lng()
            )

            this.props.updatePetsOnMap(petOnMapArray)

          }}



>
{this.renderMarkers()}

</MyMapComponent>
)


  }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    ref={props.setMapRef}
    defaultZoom={11}
    defaultCenter={{ lat: 45.50, lng: -73.56 }}
    onIdle={props.onMapIdle}
  >
    {props.children}
  </GoogleMap>
))


export default Map;








