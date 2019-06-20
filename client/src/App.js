import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';


class App extends Component {
state = {users:[], pets:[], addresses:[]};

  componentDidMount() {
   axios
      .get("http://localhost:3001/api/addresses.json")
      .then(response => {
        console.log(response);
        this.setState({
          addresses: response.data
        });
      })
      .catch(error => console.log(error));

   axios
      .get("http://localhost:3001/api/pets.json")
      .then(response => {
        console.log(response);
        this.setState({
          pets: response.data
        });
      })
      .catch(error => console.log(error));

      axios
      .get("http://localhost:3001/api/users.json")
      .then(response => {
        console.log(response);
        this.setState({
          users: response.data
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
      <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.name}</div>
        )}
        <h1>Pets</h1>
        {this.state.pets.map(pet =>
          <div key={pet.id}>{pet.name}</div>
        )}
        <Map addresses={this.state.addresses} ></Map>
      </div>




    );
  }
}

export default App;
