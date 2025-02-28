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
    colour: 'All',
    species: 'All',
    time: 'All time',

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
      // console.log(new Date(pet.date_lost).getTime(), this.state.time)
      (new Date(pet.date_lost).getTime() > this.state.time || this.state.time === "All time") &&
      (pet.status === this.state.status || this.state.status === "All") &&
      (pet.description.colour === this.state.colour || this.state.colour === "All") &&
      (pet.species === this.state.species || this.state.species === "All") &&
      (pet.status !== "Reunited") &&
      Number(pet.latitude) > this.state.sw.lat() &&
      Number(pet.latitude) < this.state.ne.lat() &&
      Number(pet.longitude) > this.state.sw.lng() &&
      Number(pet.longitude) < this.state.ne.lng()
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
     let radius = 200 + (daySinceLost*200)
     if (radius > 1500) {
      radius = 1500
     }
    return (

    <Marker
      setMarkerRef={this.setMarkerRef}
      key={pet.id}
      position = {{lat: Number(pet.latitude), lng: Number(pet.longitude)}}
      name = {pet.name}
      onClick={() => this.onMarkerClick(pet.id)}
      options={{ icon:
                { url: pet.picture_merged,
                  scaledSize: { width: 48, height: 48 },
                  } }}

       >
        {this.state.markerId === pet.id && <InfoWindow >

        <img key={pet.id} alt={`pet {pet.id}`} src={pet.picture}/>
        </InfoWindow>}




        {this.state.circleVisible === pet.id && <Circle
          options={{
            visible: this.state.circleVisible,
            radius: radius,
            fillColor:'#84bcaf',
            strokeOpacity: 0,
            fillOpacity: 0.4,
            center: {lat: Number(pet.latitude),
                            lng: Number(pet.longitude)}
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

  const time = Date.now()
  const yesterday = time - 86400000
  const threedays = time - (86400000*3)
  const fivedays = time - (86400000*5)
  const week = time - (86400000*7)


return (
<React.Fragment>
<Form.Row>
<Form.Group as={Col} controlId='formGridColour'>
              <Form.Label></Form.Label>
              <Form.Control
                as='select'
                name='colour'
                value={this.state.colour}
                onChange={this.handleChange}
              >
                <option>All</option>
                <option>Black</option>
                <option>White</option>
                <option>Grey</option>
                <option>Orange</option>
                <option>Brown</option>
                <option>Beige/Fawn</option>
                <option>Multicoloured</option>

              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridStatus'>
              <Form.Label></Form.Label>
              <Form.Control
                as='select'
                name='status'
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option>All</option>
                <option>Lost</option>
                <option>Found</option>
                <option>Spotted</option>
              </Form.Control>
            </Form.Group>

<Form.Group as={Col} controlId='formGridFamily'>
              <Form.Label></Form.Label>
              <Form.Control
                as='select'
                name='species'
                value={this.state.species}
                onChange={this.handleChange}
              >
                <option>All</option>
                <option>Cat</option>
                <option>Dog</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridTime'>
              <Form.Label></Form.Label>
              <Form.Control
                as='select'
                name='time'
                value={this.state.time}
                onChange={this.handleChange}
              >
                <option>All time</option>
                <option>{week}</option>
                <option>{fivedays}</option>
                <option>{threedays}</option>
                <option>{yesterday}</option>
              </Form.Control>
            </Form.Group>



            </Form.Row>

<MyMapComponent
  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
  loadingElement={<div className='loading' />}
  containerElement={<div className='container-element' />}
  mapElement={<div className={'map'}/>}
  setMapRef={this.setMapRef}
  userLocation={this.props.userLocation}
   onMapIdle={() => {
            this.setState({ne: this.map.getBounds().getNorthEast()});
            this.setState({sw: this.map.getBounds().getSouthWest()});

            const petOnMapArray = this.props.pets.filter(pet =>
            (new Date(pet.date_lost).getTime() > this.state.time || this.state.time === "All time") &&
              (pet.status === this.state.status || this.state.status === "All") &&
              (pet.description.colour === this.state.colour || this.state.colour === "All") &&
              (pet.species === this.state.species || this.state.species === "All") &&
              (pet.status !== "Reunited") &&
              Number(pet.latitude) > this.state.sw.lat() &&
              Number(pet.latitude) < this.state.ne.lat() &&
              Number(pet.longitude) > this.state.sw.lng() &&
              Number(pet.longitude) < this.state.ne.lng()
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
    defaultCenter={{lat: props.userLocation.lat, lng: props.userLocation.lng}}
    onIdle={props.onMapIdle}
  >
    {props.children}
  </GoogleMap>
))


export default Map;








