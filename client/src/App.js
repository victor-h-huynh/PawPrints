import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';
import { Switch, Route} from 'react-router-dom';
import Navigationbar from './Navigationbar.js';
import { Jumbotron } from './Jumbotron';
import ReportAPet from './ReportAPet.js';



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
      <React.Fragment>
        <Navigationbar></Navigationbar>
          <Jumbotron></Jumbotron>
          <Switch>
              {/* Creates routes on your pages. */}
              <Route exact path="/" render={props => <Home {...props} pets={this.state.pets} users={this.state.users} addresses={this.state.addresses}/>}/>
              {/* Add a Navbar route */}
              <Route path="/ReportAPet" component={ReportAPet}/>
              <Route path="/Login" component={Login}/>
              <Route path="/Register" component={Register}/>
          </Switch>
      </React.Fragment>
    );
  }
}

export default App;
