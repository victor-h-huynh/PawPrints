import axios from 'axios';
import React, { Component } from 'react';
import './App.scss';
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';
import { Switch, Route} from 'react-router-dom';
import ReportAPet from './ReportAPet.js';
import PetProfile from './PetProfile.js';


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
    if (this.state.pets.length > 0 && this.state.users.length > 0) {
    return (
          <Switch>
              <Route exact path="/" render={props => <Home {...props} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses}/>}/>
              <Route path="/ReportAPet" component={ReportAPet}/>
              <Route path="/Login" component={Login}/>
              <Route path="/Register" component={Register}/>
              <Route path="/Pets/:id" render={props => <PetProfile {...props} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses}/>}/>
          </Switch>
    );
    }
    else {
      return (<div>Loading...</div>)
    }
  }
}

export default App;
