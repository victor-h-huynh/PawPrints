import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css"
import Navigationbar from './Navigationbar.js';
import mergeImages from 'merge-images';
import dog from './dog.png'
import fish from './fish.png'
import marker from './marker.png'
import paw from './paw.png'
import axios from 'axios'
import { Redirect } from 'react-router-dom';




class Merged extends Component {
  state = {
    mergedImage: null
  }

  render() {

  //   const resize = (picture) => {Resizer.imageFileResizer(
  //   picture,
  //   64,
  //   64,
  //   'PNG',
  //   100,
  //   0,
  //   uri => {
  //     console.log(uri)
  //      // this.setState({mergedImage: uri})
  //           },
  //   'base64'
  //   );
  // }

  // { src: fish, x: 885, y: 460 },
  //                { src: marker, x: 0, y: 0 },
  //                { scr: paw, x: 0, y: 0 }


   mergeImages([
  { src: fish, x: 885, y: 460 },
  { src: marker, x: 0, y: 0 },
  { src: paw, x: 0, y: 0 }
])
  .then(b64 => this.setState({mergedImage: b64}));



    return (
      <img src={this.state.mergedImage}/>

      )
  }
}

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };

    onHandleSubmit = (event) => {
    event.preventDefault();


    axios
      .post('http://localhost:3001/api/authentication', {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log('')
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = response.data.token;
        this.props.updateToken(response.data.token)
      })
      .catch(err => {
        console.log(' register user error: ', err);
      });

}

    render(){
      if (this.props.token) {
          return <Redirect to={'/'} />;
        }
       else {
        return (
          <div className="login-form">
            <Form onSubmit={this.onHandleSubmit}>
        
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control className="login-control" onChange={this.handleChange} name='email' type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control className="login-control" onChange={this.handleChange} name='password' type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <AwesomeButton type="secondary">Login</AwesomeButton>
            </Form>
          </div>
      )
    }

    }
}





export default Login;
