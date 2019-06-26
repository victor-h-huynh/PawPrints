import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow, Circle } from "react-google-maps";




class Map extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.marker = React.createRef();
  }

  state = {
    markerId: null,
    circleVisible: null
  }

  setMapRef = (map) => {
    this.map = map
  }

  setMarkerRef = (marker) => {
    this.marker = marker
  }

  onMarkerClick = (id) => {
    if (this.state.markerId === id){
      this.setState({
      markerId: null,
      circleVisible: null
      })
    }
    else {
      this.setState({
      markerId: id,
      circleVisible: id
    })
    }
  }

  renderMarkers() {
  return this.props.pets.map(pet => {
     const timeLost = new Date(pet.date_lost).getTime()
     const timeNow = Date.now()
     const daySinceLost = Math.floor((timeNow - timeLost)/86400000)
     let radius = 500 + (daySinceLost*500)
     if (radius > 4000) {
      radius = 4000
     }
    return (

    <Marker
      setMarkerRef={this.setMarkerRef}
      key={pet.id}
      position = {{lat: Number(pet.latitude), lng: -Number(pet.longitude)}}
      name = {pet.name}
      onClick={() => this.onMarkerClick(pet.id)}
      title = "test"
      options={{ icon:
                { url: pet.picture,
                  scaledSize: { width: 28, height: 28 },
                  } }}

       >
        {this.state.markerId === pet.id && <InfoWindow >
        <h4>{pet.name}</h4>
        </InfoWindow>}




        {this.state.circleVisible === pet.id && <Circle
          options={{
            visible: this.state.circleVisible,
            radius: radius,
            fillColor:'#84bcaf',
            strokeOpacity: 0,
            fillOpacity: 0.4,
            center: {lat: Number(pet.latitude),
                            lng: -Number(pet.longitude)}
          }
          }
           />}
         </Marker>
         )
  })
}

componentDidMount() {

}

  render() {

return (
<MyMapComponent
  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
  loadingElement={<div className='loading' />}
  containerElement={<div className='container-element' />}
  mapElement={<div className={'map'}/>}
  setMapRef={this.setMapRef}
   onMapIdle={() => {
            let ne = this.map.getBounds().getNorthEast();
            let sw = this.map.getBounds().getSouthWest();

            const petOnMapArray = this.props.pets.filter(pet =>

              (pet.latitude) > sw.lat() &&
              (pet.latitude) < ne.lat() &&
              -Number(pet.longitude) > sw.lng() &&
              -Number(pet.longitude) < ne.lng()
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
    {console.log(props.children)}
  </GoogleMap>
))


export default Map;








