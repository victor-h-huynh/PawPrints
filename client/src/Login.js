import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css"
import Navigationbar from './Navigationbar.js';
import mergeImages from 'merge-images';
import black_circle from './black_circle.png'
import white_square from './white_square.png'
import red_triangle from './red_triangle.png'
import dog from './dog.png'
import Resizer from 'react-image-file-resizer';
import fish from './fish.png'



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


   mergeImages([red_triangle, fish])
  .then(b64 => this.setState({mergedImage: b64}));



    return (
      <img src={this.state.mergedImage}/>

      )
  }
}

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    render(){
        return (
        <React.Fragment>

        <Form>
          <Navigationbar></Navigationbar>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <AwesomeButton type="secondary">Login</AwesomeButton>
          </Form>
          <Merged/>
          </React.Fragment>

      )
    }
}





export default Login;
