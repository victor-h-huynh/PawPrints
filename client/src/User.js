import React, { Component } from 'react';
import './App.scss';
import { ProgressBar, Card, Button, Form } from 'react-bootstrap';
import Switch from "react-switch";
import axios from "axios";
import setupNotifications from './setupNotifications.js';

class User extends Component {
  state = {
    checked: false,
    id: "",
    name: "",
    phone_number: "",
    alerts: false,
  }

  componentDidMount() {
    this.setState({
      checked: this.props.user.alerts,
      id: this.props.user.id,
      name: this.props.user.name,
      email: this.props.user.email,
      phone_number: this.props.user.phone_number,
      alerts: this.props.user.alerts,
    })
  }

  handleSwitchChange = (checked) => {
    this.setState({ checked });
    this.setState({ alerts: checked },
      ()=> {
        if (this.state.alerts === true) {
          setupNotifications();
      } else {
        axios.post('http://localhost:3001/api/unsubscribe');
      }
      })
    }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
        .put(`http://localhost:3001/api/users/${this.props.user.id}`,
        {
          update: 2,
          id: this.props.user.id,
          name: this.state.name,
          phone_number: this.state.phone_number,
          alerts: this.state.alerts

        })
        .then(response => {
          console.log(response);
          this.setState({
            name: response.data.name,
            phone_number: response.data.phone_number,
            alerts: response.data.alerts
          });
          this.props.updateNavState(response.data.name)
        })
        .catch(err => {
          console.log('report pet error: ', err);
        });
  };


  render() {
    const user = this.props.user;
    let badge1;
    let badge2;
    let badge3;
    let badge4;
    let badge5;

    let badgeStyle = {
      opacity: 0.5,
    };

    let currentBadgeStyle = {
      opacity: 1,
      width: "192px",
      height: "192px"
    }

    const levels = Math.floor(this.props.user.points/1000)
    const progress = (this.props.user.points - levels*1000)
    const missingPoints = Math.floor(1000 - progress)

      if (levels === 0) {
      badge1 = <img id="badge1" style={currentBadgeStyle} alt="" src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/8/85/SeasonalRank1-1.png/140px-SeasonalRank1-1.png?version=ce7c6eea36971495cdad1f06e7ef3709"  />;
    } else {
      badge1 = <img id="badge1" style={badgeStyle} alt="" src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/8/85/SeasonalRank1-1.png/140px-SeasonalRank1-1.png?version=ce7c6eea36971495cdad1f06e7ef3709" />;
    }
    if (levels === 1) {
      badge2 = <img id="badge2" style={currentBadgeStyle} alt="" src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/7/76/SeasonalRank4-1.png/140px-SeasonalRank4-1.png?version=7a9db7f22e02de4a58923f40da38b9db" />
    } else {
      badge2 = <img id="badge2" style={badgeStyle} alt="" src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/7/76/SeasonalRank4-1.png/140px-SeasonalRank4-1.png?version=7a9db7f22e02de4a58923f40da38b9db" />
    }
    if (levels === 2) {
      badge3 = <img id="badge3" style={currentBadgeStyle} alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTm7OMsVnQuvqDvo-6p-HxzZ0i_dqtxxPfofU2WikW60LYIfPHg" />
    } else {
      badge3 = <img id="badge3" style={badgeStyle} alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTm7OMsVnQuvqDvo-6p-HxzZ0i_dqtxxPfofU2WikW60LYIfPHg" />
    }
    if (levels === 3) {
      badge4 = <img id="badge4" style={currentBadgeStyle} alt="" src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/1/1c/SeasonalRank6-2.png/140px-SeasonalRank6-2.png?version=87515796db90be81886c62cad9faf87f" />
    } else {
      badge4 = <img id="badge4" style={badgeStyle} alt="" src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/1/1c/SeasonalRank6-2.png/140px-SeasonalRank6-2.png?version=87515796db90be81886c62cad9faf87f" />
    }
    if (levels >= 4) {
      badge5 = <img id="badge5" style={currentBadgeStyle} alt="" src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/d/df/SeasonalRankTop1.png/140px-SeasonalRankTop1.png?version=dccf8399e340ddf775a825e610cc5ad3" />
    } else {
      badge5 = <img id="badge5" style={badgeStyle} alt="" src="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/d/df/SeasonalRankTop1.png/140px-SeasonalRankTop1.png?version=dccf8399e340ddf775a825e610cc5ad3" />
    }

    return(
<React.Fragment>
      <React.Fragment>
        <div> 0 ------- Level {levels}! You need {missingPoints} points to reach level {levels + 1} ------- 1000
         {badge1}
         {badge2}
         {badge3}
         {badge4}
         {badge5}
        </div>

        <ProgressBar variant="success" animated now={progress/10} />
      </React.Fragment>

      <div className="userProfilePage">

            <Card className="user">
            <Card.Body>
            <Form>
              <Form.Group controlId="formGridName">
                <Form.Label/>
                <Form.Control
                  className="register-control"
                  type="name"
                  name="name"
                  placeholder={this.props.user.name}
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formGridPhoneNumber">
                <Form.Label/>
                <Form.Control
                  className="register-control"
                  type="phone_number"
                  name="phone_number"
                  value={this.state.phone_number}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <div>Alerts : {user.alerts}<Switch onChange={this.handleSwitchChange} checked={this.state.checked}/> </div>
              <Button onClick={this.handleSubmit} variant="success"> Update Profile </Button>
              </Form>
            </Card.Body>
          </Card>
          </div>


</React.Fragment>

    )
  }
}

export default User;


// {levels  && <img scr="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/8/85/SeasonalRank1-1.png/140px-SeasonalRank1-1.png?version=ce7c6eea36971495cdad1f06e7ef3709" />}


