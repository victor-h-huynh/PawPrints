import React, {
  Component
} from 'react';
import {
  Form,
  Button,
  Col
} from 'react-bootstrap';
import axios from 'axios';
import Navigationbar from './Navigationbar.js';
// import DayPicker from 'react-day-picker'
import {
  Redirect
} from 'react-router-dom'


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
      latitude: 45.7,
      longitude: 73.1
    };


  }


  setPictureState = picture => {
    this.setState({
      picture: picture
    })
    console.log(this.state.picture)
  }


  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      picture: event.target.files[0]
    });
  };

  // fileUploadHandler = () => {
  //   axios.post('https://us-central1-final-project-1561040119727.cloudfunctions.net/uploadFile')
  // }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  handleSubmit = event => {
    event.preventDefault();


    const file = this.state.picture
    const storageRef = this.state.storage.ref();
    const that = this

    const uploadPicture = storageRef.child(this.state.picture.name).put(file);
    uploadPicture.on('state_changed', function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      function(error) {
        console.log(error)
      },
      function() {
        uploadPicture.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log(downloadURL)
          that.setState({
            picture: downloadURL
          }, () => {
            axios
              .post('http://localhost:3001/api/pets', {
                description: {
                  breed: that.state.breed,
                  colour: that.state.colour,
                  sex: that.state.sex,
                  additional: that.state.additional
                },
                address: {
                  street_number: that.state.street_number,
                  street_name: that.state.street_name,
                  apartment: that.state.apartment,
                  city: that.state.city,
                  province: that.state.province,
                  postal_code: that.state.postal_code,
                  latitude: 45.7,
                  longitude: -73.1
                },
                pet: {
                  name: that.state.name,
                  species: that.state.species,
                  status: that.state.status,
                  date_lost: that.state.date,
                  picture: that.state.picture,
                  user_id: 1
                }
              })
              .then(response => {
                that.setState({
                  id: response.data.id,
                  redirectToProfile: true
                });
              })
              .catch(err => {
                console.log('report pet error: ', err);
              });
          })
        })

      })



  };

  componentDidMount() {
    this.setState({
      storage: window.firebase.storage()
    })

  }

  render() {
    if (this.state.redirectToProfile === true) {
      return <Redirect to = {
        `/pets/${this.state.id}`
      }
      />
    } else {
      return ( <
        div >
        <
        Navigationbar > < /Navigationbar> <
        Form onSubmit = {
          this.handleSubmit
        } >
        <
        Form.Row >
        <
        Form.Group as = {
          Col
        }
        controlId = 'formGridName' >
        <
        Form.Label > Name < /Form.Label> <
        Form.Control type = 'name'
        name = 'name'
        placeholder = 'Enter name'
        value = {
          this.state.name
        }
        onChange = {
          this.handleChange
        }
        /> <
        /Form.Group>

        <
        Form.Group as = {
          Col
        }
        controlId = 'formGridSpecies' >
        <
        Form.Label > Species < /Form.Label> <
        Form.Control as = 'select'
        name = 'species'
        value = {
          this.state.species
        }
        onChange = {
          this.handleChange
        } >
        <
        option > Enter a Species < /option> <
        option > Cat < /option> <
        option > Dog < /option> <
        option > [̲̅$̲̅(̲̅2 οο̲̅)̲̅ $̲̅] < /option> <
        option > __̴ı̴̴̡̡̡̡͌ l̡̡̡̡͌ l̡ * ̴̡̡̡ı̴̴̡̡̡͡ | ̲̲̲̲͡͡͡▫̲̲̲̲͡͡͡π̲̲̲̲͡͡͡▫̲̲̲͡͡ | ̴̡̡̡̡̡ı̴̡̡̡͌ l̡̡̡̡.___ < /option> <
        option > (╭ರ_•́) < /option> <
        option > ( ^ ​_ ^ ）o自自o（ ^ _​ ^ ) < /option> <
        /Form.Control> <
        /Form.Group>

        <
        Form.Group as = {
          Col
        }
        controlId = 'formGridBreed' >
        <
        Form.Label > Breed < /Form.Label> <
        Form.Control type = 'breed'
        name = 'breed'
        placeholder = 'Enter Breed'
        value = {
          this.state.breed
        }
        onChange = {
          this.handleChange
        }
        /> <
        /Form.Group> <
        /Form.Row>

        <
        Form.Row >
        <
        Form.Group as = {
          Col
        }
        controlId = 'formGridStatus' >
        <
        Form.Label > Status < /Form.Label> <
        Form.Control as = 'select'
        name = 'status'
        value = {
          this.state.status
        }
        onChange = {
          this.handleChange
        } >
        <
        option > Status < /option> <
        option > Lost < /option> <
        option > Found < /option> <
        option > Reunited < /option> <
        /Form.Control> <
        /Form.Group>

        <
        Form.Group as = {
          Col
        }
        controlId = 'formGridStatus' >
        <
        Form.Label > Sex < /Form.Label> <
        Form.Control as = 'select'
        name = 'sex'
        value = {
          this.state.sex
        }
        onChange = {
          this.handleChange
        } >
        <
        option > Sex < /option> <
        option > Male < /option> <
        option > Female < /option> <
        /Form.Control> <
        /Form.Group>

        <
        Form.Group as = {
          Col
        }
        controlId = 'formGridColoir' >
        <
        Form.Label > Colour < /Form.Label> <
        Form.Control type = 'name'
        name = 'colour'
        placeholder = 'Colour'
        value = {
          this.state.colour
        }
        onChange = {
          this.handleChange
        }
        /> <
        /Form.Group>

        <
        Form.Group as = {
          Col
        }
        controlId = 'formGridDateLost' >
        <
        Form.Label > Date Lost < /Form.Label> <
        Form.Control type = 'name'
        name = 'date_lost'
        placeholder = 'Date Lost'
        value = {
          this.state.date_lost
        }
        onChange = {
          this.handleChange
        }
        /> <
        /Form.Group>

        <
        Form.Group as = {
          Col
        }
        controlId = 'formGridLastSeen' >
        <
        Form.Label > Last known location < /Form.Label> <
        Form.Control placeholder = 'Last Seen' / >
        <
        /Form.Group> <
        /Form.Row>

        <
        Form.Row >
        <
        Form.Group as = {
          Col
        }
        controlId = 'formGridAdditionalComments' >
        <
        Form.Label > Additional Comments < /Form.Label> <
        Form.Control placeholder = ''
        name = 'additional'
        value = {
          this.state.additional
        }
        onChange = {
          this.handleChange
        }
        /> <
        /Form.Group> <
        /Form.Row>

        <
        Form.Row >
        <
        input type = 'file'
        name = 'picture'
        onChange = {
          this.fileSelectedHandler
        }
        /> <
        /Form.Row>

        <
        Button variant = 'primary'
        type = 'submit' >
        Submit <
        /Button> <
        /Form> <
        /div>
      );
    }
  }
}

export default ReportAPet;