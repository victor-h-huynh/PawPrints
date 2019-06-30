import React, { Component } from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import PetMap from './PetMap.js';
import { Redirect } from 'react-router-dom';
import marker from './marker.png';
import paw from './paw.png';


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
      current_user: '',
      errors: [],
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
      latitude: this.props.userLocation.lat,
      longitude: this.props.userLocation.lng,

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
    this.setState({
      picture: event.target.files[0]
    });
    this.resize(event.target.files[0])
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
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

  sendToDB = (picture) => {
    var date = new Date(this.state.date_lost).getTime();
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
        user_id: this.state.current_user.id,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      },
    })
    .then(response => {
      this.props.addAPet(response.data);
      this.setState({
        id: response.data.id,
        redirectToProfile: true,
      });
      //Push Notification
      if(response){
        axios.post('/api/notification',
          {message: `A ${this.state.species} was ${this.state.status} in your area.`,
          image: (this.state.picture? this.state.picture: null),
          URL: `http:localhost/pets${response.data.id}`});
        }
      })
    .catch(err => {
      console.log('report pet error: ', err.response.data);
      this.setState({
          errors: err.response.data
        })
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

    if (!originalPicture && this.state.species === "Dog") {
      this.setState({
        picture: "https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/dog.jpg?alt=media&token=3bf752ef-a6b5-44b7-bb73-6e067f5e0bca",
        picture_merged: "https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/dog.jpg?alt=media&token=3bf752ef-a6b5-44b7-bb73-6e067f5e0bca"
      }, () => this.sendToDB())
    }
    else if (!originalPicture && this.state.species === "Cat") {
       this.setState({
        picture: "https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/cat.png?alt=media&token=defd9f60-3f31-4864-a7d1-6d488972705d",
        picture_merged: "https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/cat.png?alt=media&token=defd9f60-3f31-4864-a7d1-6d488972705d"
      }, () => this.sendToDB())
    }
    else if (originalPicture && this.state.species) {
    const storageRef = this.state.storage.ref();
    const that = this;

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
  this.sendToDB()
}
  };

  componentDidMount() {
    console.log(this.props)
    this.setState({
      storage: window.firebase.storage(),
      current_user: this.props.current_user,
    });
    this.imgMarker = new Image()
    this.imgMarker.src = marker
    this.imgPaw = new Image()
    this.imgPaw.src = paw
  }

  render() {
      const { errors } = this.state;
    if (this.state.redirectToProfile === true) {
      return <Redirect to={`/pets/${this.state.id}`} />;
    } else {
      return (
        <div className="report-a-pet">

        <Form onSubmit={this.handleSubmit}>


        <Form.Row>
          <Form.Group as={Col} controlId='formGridStatus'>
              <Form.Label></Form.Label>
              <Form.Control
                className="report-a-pet-control"
                as='select'
                name='status'
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option>Status</option>
                <option>Lost</option>
                <option>Found</option>
                <option>Spotted</option>
              </Form.Control>
            </Form.Group>



            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label></Form.Label>
              <Form.Control
                className="report-a-pet-control"
                type='name'
                name='name'
                placeholder='Enter name'
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridSpecies'>
              <Form.Label></Form.Label>
              <Form.Control
                className="report-a-pet-control"
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
              <Form.Label></Form.Label>
              <Form.Control
                className="report-a-pet-control"
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
              <Form.Label></Form.Label>
              <Form.Control
                className="report-a-pet-control"
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
              <Form.Label></Form.Label>
              <Form.Control
                className="report-a-pet-control"
                as='select'
                name='colour'
                value={this.state.colour}
                onChange={this.handleChange}
              > <option>All</option>
              <option>Black</option>
              <option>White</option>
              <option>Grey</option>
              <option>Orange</option>
              <option>Brown</option>
              <option>Beige/Fawn</option>
              <option>Multicoloured</option>
                </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridDateLost'>
              <Form.Label></Form.Label>
              <Form.Control
                className="report-a-pet-control"
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
              <Form.Label></Form.Label>
              <Form.Control
                className="report-a-pet-comment"
                placeholder='Additional Comments'
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

          <Button className="report-a-pet-btn" variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        </div>
      );
    }
  }
}

export default ReportAPet;
