import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';
import { Switch, Route } from 'react-router-dom';


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

      axios
      .get("http://localhost:3001/api/descriptions.json")
      .then(response => {
        console.log(response);
        this.setState({
          descriptions: response.data
        });
      })
      .catch(error => console.log(error));

  }

  render() {
    return (

          <Switch>
            {/* Creates routes on your pages. */}
            <Route exact path="/" render={props => <Home {...props} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses}/>}/>
          </Switch>
    );
  }
}

export default App;
