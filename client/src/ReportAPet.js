import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import PetMap from './PetMap.js';
import { Redirect } from 'react-router-dom';
import marker from './marker.png'
import paw from './paw.png'

class ReportAPet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToProfile: false,

      id: '',
      name: '',
      species: '',
      status: '',
      date_lost: '',
      picture: null,
      picture_merged: null,
      user_id: '',

      breed: '',
      colour: '',
      sex: '',
      additional: '',

      street_number: '',
      street_name: '',
      apartment: '',
      city: '',
      province: '',
      postal_code: '',
      latitude: '',
      longitude: '',

      mapPosition: {
				lat: this.props.userLocation.lat,
				lng: this.props.userLocation.lng
			},
			markerPosition: {
				lat: this.props.userLocation.lat,
				lng: this.props.userLocation.lng
			}

    };
  }

  setPictureState = picture => {
    this.setState({
      picture: picture
    });
    console.log(this.state.picture);
  };

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      picture: event.target.files[0]
    });
    this.resize(event.target.files[0])
  };

  // fileUploadHandler = () => {
  //   axios.post('https://us-central1-final-project-1561040119727.cloudfunctions.net/uploadFile')
  // }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    console.log(event.target.value)
    console.log("STATE", this.state.picture_merged)
  };

  dataURItoBlob = (dataURI) => {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/png'});
}


  updateParentState = (data) => {
    if (data.markerPosition){
    this.setState({
      latitude: data.markerPosition.lat,
      longitude: data.markerPosition.lng,
      ...data
    });
  } else {
    this.setState({...data})
  }
  }

  sendToDB = () => {
    console.log(this.state.date_lost);
    var date = new Date(this.state.date_lost).getTime();
    console.log(date);
    axios
    .post('http://localhost:3001/api/pets', {
      description: {
        breed: this.state.breed,
        colour: this.state.colour,
        sex: this.state.sex,
        additional: this.state.additional
      },
      address: {
        street_number: this.state.street_number,
        street_name: this.state.street_name,
        city: this.state.city,
        province: this.state.province,
        postal_code: this.state.postal_code,

      },
      pet: {
        name: this.state.name,
        species: this.state.species,
        status: this.state.status,
        date_lost: date,
        picture: this.state.picture,
        picture_merged: this.state.picture_merged,
        user_id: this.state.user_id,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      },
    })
    .then(response => {
      console.log(response);
      this.props.addAPet(response.data);
      this.setState({
        id: response.data.id,
        redirectToProfile: true,
      });
    })
    .catch(err => {
      console.log('report pet error: ', err);
    });
  }


resize = picture => {

    const reader = new FileReader();
    reader.onload = e => {
      const canvas = document.createElement('canvas')
      canvas.height = 128
      canvas.width = 128
      const ctx = canvas.getContext('2d')
      const img = document.createElement('img')
      img.src = e.target.result
      img.onload = () => {

        ctx.drawImage(img, 32, 16, 64, 64)
        ctx.drawImage(this.imgMarker, 0, 0, 128, 128)
        ctx.drawImage(this.imgPaw, 50, 84, 28, 28)

        canvas.toBlob((blob) => this.setState({picture_merged: blob}))
      }
    }
    reader.readAsDataURL(picture);

  }


  handleSubmit = event => {
    event.preventDefault();
    const originalPicture = this.state.picture;
    const storageRef = this.state.storage.ref();
    const that = this;

        if (originalPicture) {
          const uploadPicture = storageRef.child(this.state.picture.name).put(originalPicture);
          const uploadPictureMerged = storageRef.child(`Marker${this.state.picture.name}`).put(this.state.picture_merged);
          const picturePromise = new Promise((resolve, reject) => {
            uploadPicture.on(
              'state_changed',
              function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              },
              function(error) {
                console.log(error);
              },
              function() {
                uploadPicture.snapshot.ref.getDownloadURL().then(downloadURL => {
                  console.log(downloadURL);
                  that.setState({
                      picture: downloadURL
                    },
                    () => {

                      resolve();
                    })
                });
              });
          })
          const pictureMergedPromise = new Promise((resolve, reject) => {
            uploadPictureMerged.on(
              'state_changed',
              function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              },
              function(error) {
                console.log(error);
              },
              function() {
                uploadPictureMerged.snapshot.ref.getDownloadURL().then(downloadURL => {
                  console.log(downloadURL);
                  that.setState({
                      picture_merged: downloadURL
                    },
                    () => {

                      resolve();
                    })
                });
              });
          })
          Promise.all([picturePromise, pictureMergedPromise]).then(() => this.sendToDB())
        } else {
          this.sendToDB();
        }

  };

  componentDidMount() {
    console.log(this.props)
    this.setState({
      storage: window.firebase.storage(),
      user_id: this.props.current_user.id
    });
    this.imgMarker = new Image()
    this.imgMarker.src = marker
    this.imgPaw = new Image()
    this.imgPaw.src = paw
  }

  render() {
    if (this.state.redirectToProfile === true) {
      return <Redirect to={`/pets/${this.state.id}`} />;
    } else {
      return (
        <React.Fragment>

        <Form onSubmit={this.handleSubmit}>


          <Form.Group as={Col} controlId='formGridStatus'>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as='select'
                name='status'
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option>Status</option>
                <option>Lost</option>
                <option>Found</option>
                <option>Reunited</option>
              </Form.Control>
            </Form.Group>


            <Form.Row>
            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                name='name'
                placeholder='Enter name'
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridSpecies'>
              <Form.Label>Species</Form.Label>
              <Form.Control
                as='select'
                name='species'
                value={this.state.species}
                onChange={this.handleChange}
              >
                <option>Enter a Species</option>
                <option>Cat</option>
                <option>Dog</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridBreed'>
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type='breed'
                name='breed'
                placeholder='Enter Breed'
                value={this.state.breed}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridSex'>
              <Form.Label>Sex</Form.Label>
              <Form.Control
                as='select'
                name='sex'
                value={this.state.sex}
                onChange={this.handleChange}
              >
                <option>Sex</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridColour'>
              <Form.Label>Colour</Form.Label>
              <Form.Control
                as='select'
                name='colour'
                value={this.state.colour}
                onChange={this.handleChange}
              > <option>Colour</option>
                <option>Black</option>
                <option>White</option>
                <option>Grey</option>
                <option>Red</option>
                </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridDateLost'>
              <Form.Label>Date Lost</Form.Label>
              <Form.Control
                type='name'
                name='date_lost'
                placeholder='Date Lost'
                value={this.state.date_lost}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridAdditionalComments'>
              <Form.Label>Additional Comments</Form.Label>
              <Form.Control
                placeholder=''
                name='additional'
                value={this.state.additional}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <input
              type='file'
              name='picture'
              onChange={this.fileSelectedHandler}
            />
          </Form.Row>

          <Form style={{ margin: '25px', marginBottom: '50px' }}>
            <PetMap
              updateParentState={this.updateParentState}
              parentState={this.state}
              google={this.props.google}
              center={{ lat: this.props.userLocation.lat, lng: this.props.userLocation.lng }}
              height='300px'
              width='100%'
              zoom={15}
              userLocation={this.props.userLocation}
            />
          </Form>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        </React.Fragment>
      );
    }
  }
}

export default ReportAPet;
