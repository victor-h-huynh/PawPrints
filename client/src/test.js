import React, { Component } from 'react';
import axios from 'axios';


class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users:[],
      pets:[],
      petsOnMap: [],
      addresses:[],
    };
  }

  componentDidMount() {
    console.log("Loading test");
    axios.all([
      axios.get('/api/addresses.json'),
      axios.get('http://localhost:3001/api/pets.json'),
      axios.get('http://localhost:3001/api/users.json'),
      axios.get('http://localhost:3001/api/descriptions.json'),
    ])
    .then(axios.spread((addressesRes, petsRes, usersRes, descriptionsRes) => {
      console.log(petsRes);
      this.setState({
        addresses: addressesRes.data,
        pets: petsRes.data,
        users: usersRes.data,
        descriptions: descriptionsRes.data,
      })
    }))
    .then(res => {
      console.log("RES", res) 
    })
    .catch(error => console.log(error));
  }
  

  render() {
  return (
    <div>"Hello</div>
  )
  }

}


export default Test;