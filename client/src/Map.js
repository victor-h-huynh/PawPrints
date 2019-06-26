import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow, Circle } from "react-google-maps";
import { Form, Col } from 'react-bootstrap';





class Map extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.marker = React.createRef();
  }

  state = {
    markerId: null,
    circleVisible: null,
    name: '',
    status: "All",
    ne: '',
    sw: '',
  }

  setMapRef = (map) => {
    this.map = map
  }

  setMarkerRef = (marker) => {
    this.marker = marker
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
    const petOnMapArray = this.props.pets.filter(pet =>
      (pet.status === this.state.status || this.state.status === "All") &&
      Number(pet.latitude) > this.state.sw.lat() &&
      Number(pet.latitude) < this.state.ne.lat() &&
      -Number(pet.longitude) > this.state.sw.lng() &&
      -Number(pet.longitude) < this.state.ne.lng()
    )
    this.props.updatePetsOnMap(petOnMapArray)
    });

  };
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
  return this.props.petsOnMap.map(pet => {
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
<React.Fragment>
<Form.Row>
<Form.Group as={Col} controlId='formGridName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                as='select'
                name='name'
                value={this.state.name}
                onChange={this.handleChange}
              >
                <option>Name</option>
                <option>Chance</option>
                <option>Bella</option>
                <option>Sheev</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridStatus'>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as='select'
                name='status'
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option>All</option>
                <option>Lost</option>
                <option>Found</option>
                <option>Reunited</option>
              </Form.Control>
            </Form.Group>
            </Form.Row>

<MyMapComponent
  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
  loadingElement={<div className='loading' />}
  containerElement={<div className='container-element' />}
  mapElement={<div className={'map'}/>}
  setMapRef={this.setMapRef}
   onMapIdle={() => {
            this.setState({ne: this.map.getBounds().getNorthEast()});
            this.setState({sw: this.map.getBounds().getSouthWest()});

            const petOnMapArray = this.props.pets.filter(pet =>
              (pet.status === this.state.status || this.state.status === "All") &&
              Number(pet.latitude) > this.state.sw.lat() &&
              Number(pet.latitude) < this.state.ne.lat() &&
              -Number(pet.longitude) > this.state.sw.lng() &&
              -Number(pet.longitude) < this.state.ne.lng()
            )

            this.props.updatePetsOnMap(petOnMapArray)

          }}



>
{this.renderMarkers()}

</MyMapComponent>
</React.Fragment>
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








