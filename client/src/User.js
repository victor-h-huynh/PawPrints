import React, { Component } from "react";
import "./App.scss";
import {
  ProgressBar,
  Card,
  Button,
  Form,
  Alert,
  Badge,
  Image,
  Col
} from "react-bootstrap";
import Switch from "react-switch";
import axios from "axios";
import setupNotifications from "./setupNotifications.js";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

class User extends Component {
  state = {
    checked: false,
    id: "",
    name: "",
    phone_number: "",
    alerts: false,
    current_user_id: 0,
    userPet: [],
    errors: []
  };

  componentDidMount() {
    let current_user_id;
    if (!this.props.current_user) {
      current_user_id = 0;
    } else {
      current_user_id = this.props.current_user.id;
    }
    const userPet = this.props.pets.filter(
      pet => pet.user_id === this.props.user.id
    );
    this.setState({
      checked: this.props.user.alerts,
      id: this.props.user.id,
      name: this.props.user.name,
      email: this.props.user.email,
      phone_number: this.props.user.phone_number,
      alerts: this.props.user.alerts,
      current_user_id: current_user_id,

      userPet: userPet,
      points: this.props.user.points
    })


    });

  }

  handleSwitchChange = checked => {
    this.setState({ checked });
    this.setState({ alerts: checked }, () => {
      if (this.state.alerts === true) {
        setupNotifications();
      } else {
        axios.post("http://localhost:3001/api/unsubscribe", {
          id: this.props.user.id
        });
        navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
          serviceWorkerRegistration.pushManager
            .getSubscription()
            .then(subscription => {
              subscription
                .unsubscribe()
                .then(function() {
                  console.log("Successfully unsubscribed!.");
                })
                .catch(e => {
                  console.log(
                    "Error thrown while unsubscribing from push messaging",
                    e
                  );
                });
            });
        });
      }
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/api/users/${this.props.user.id}`, {
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
        this.props.updateNavState(response.data.name);
      })
      .catch(err => {
        console.log("report user error: ", err.response.data);
        this.setState({
          errors: err.response.data
        });
      });
  };

  render() {
    const { errors } = this.state;
    const user = this.props.user;
    let badge1;
    let badge2;
    let badge3;
    let badge4;
    let badge5;
    let badge6;
    let badge7;
    let currentBadge;

    let badgeStyle = {
      opacity: 0.3,
      width: "192px",
      height: "192px"
    };

    let currentBadgeStyle = {
      opacity: 1,
      width: "192px",
      height: "192px"

    }

    const levels = Math.floor(this.props.user.points/1000)
    const progress = (this.props.user.points - levels*1000)
    const missingPoints = Math.floor(1000 - progress)
    let percentage = (Math.round((this.state.points/7000) * 100) / 100)*100
    console.log(percentage)
    console.log(this.state.points)
    if (percentage === Infinity) {
      percentage = 0
    } else if (percentage > 100){
      percentage = 100
    }

    console.log(percentage)

    };


    if (0 < percentage && percentage < 16.67) {
      badge1 = <img id="badge1" style={currentBadgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl0.png?alt=media&token=65a6f1a6-4ef7-4619-ba04-8e8a84a14bad" />;
     currentBadge = badge1
    } else {
      badge1 = <img id="badge1" style={badgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl0.png?alt=media&token=65a6f1a6-4ef7-4619-ba04-8e8a84a14bad" />;
    }
    if (16.68 < percentage && percentage < 33.33) {
      badge2 = <img id="badge2" style={currentBadgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/Badgelvl1.png?alt=media&token=136b63ac-e990-4642-aa28-2fe5415087d5" />
      currentBadge = badge2
    } else {
      badge2 = <img id="badge2" style={badgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/Badgelvl1.png?alt=media&token=136b63ac-e990-4642-aa28-2fe5415087d5" />
    }
    if (33.33 < percentage && percentage < 50) {
      badge3 = <img id="badge3" style={currentBadgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl2.png?alt=media&token=0d572115-5875-4605-a2b9-5bf05f7a6ea6" />
      currentBadge = badge3
    } else {
      badge3 = <img id="badge3" style={badgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl2.png?alt=media&token=0d572115-5875-4605-a2b9-5bf05f7a6ea6" />
    }
    if (50.01 < percentage && percentage < 66.67) {
      badge4 = <img id="badge4" style={currentBadgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl3.png?alt=media&token=d5a155f7-812e-4204-b2e1-e04d7f03a5b9" />
      currentBadge = badge4
    } else {
      badge4 = <img id="badge4" style={badgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl3.png?alt=media&token=d5a155f7-812e-4204-b2e1-e04d7f03a5b9" />
    }
    if (66.68 < percentage && percentage < 83.33) {
      badge5 = <img id="badge5" style={currentBadgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl5.png?alt=media&token=7f821419-b0b2-4676-8cd4-e82ec1c2f9bf" />
      currentBadge = badge5
    } else {
      badge5 = <img id="badge5" style={badgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl5.png?alt=media&token=7f821419-b0b2-4676-8cd4-e82ec1c2f9bf" />
    }
    if (83.34 < percentage && percentage <= 99.99) {
      badge6 = <img id="badge7" style={currentBadgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl6.png?alt=media&token=e5f7dcac-33c4-41ac-9e05-8f640b4e5d87" />
      currentBadge = badge6
    } else {
      badge6 = <img id="badge7" style={badgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl6.png?alt=media&token=e5f7dcac-33c4-41ac-9e05-8f640b4e5d87" />
    }
    if (percentage >= 100) {
      badge7 = <img id="badge7" style={currentBadgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl7.png?alt=media&token=54ae2e9a-dd5d-4048-95a9-494ed615931e" />
      currentBadge = badge7
    } else {
      badge7 = <img id="badge7" style={badgeStyle} alt="" src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/badgelvl7.png?alt=media&token=54ae2e9a-dd5d-4048-95a9-494ed615931e" />
    }




    return (
      <React.Fragment>
      <React.Fragment>
        <h3 className="levels-text-2"> Level {levels}!  </h3>
        <h3 className="levels-text"> You need {missingPoints} points to reach level {levels+1} </h3>
        <div className="badges">
         Level 0
         {badge1}
         Level 1
         {badge2}
         Level 2
         {badge3}
         Level 3
         {badge4}
         Level 4
         {badge5}
         Level 5
         {badge6}
         Level 6++
         {badge7}
        </div>
        </React.Fragment>

        {this.props.current_user &&
          this.state.current_user_id === this.state.id && (
            <div className="userProfilePage">
              <Card className="user">
                <Card.Body>
                  <Card.Text> Email: {this.state.email}</Card.Text>
                  <Form>
                    <Form.Group controlId="formGridName">
                      <Form.Label />
                      <Form.Control
                        className="register-control"
                        type="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGridPhoneNumber">
                      <Form.Label />
                      <Form.Control
                        className="register-control"
                        type="phone_number"
                        name="phone_number"
                        value={this.state.phone_number}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <div>
                      Alerts : {user.alerts}
                      <Switch
                        onChange={this.handleSwitchChange}
                        checked={this.state.checked}
                      />{" "}
                    </div>
                    <Button onClick={this.handleSubmit} variant="success">
                      {" "}
                      Update Profile{" "}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          )}

      </React.Fragment>

                    <ProgressBar className="progressBar" label={`${percentage}%`} variant="success" animated now={percentage} />


      {this.props.current_user && this.state.current_user_id === this.state.id &&
        <div className="userProfile">
            <Card className="userInfo">
            <Card.Body className="userCardBody2">
            <Col className="userPicture" xs={0} md={0}>
      {currentBadge}
    </Col>
            <Form>
            Email: {this.state.email}
              <Form.Group controlId="formGridName">
                <Form.Label/>
                <Form.Control
                  className="register-control"
                  type="name"
                  name="name"
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

              <div className="alerts" >Alerts : {user.alerts}<Switch onChange={this.handleSwitchChange} checked={this.state.checked}/> </div>
              <Button className="alert-button" onClick={this.handleSubmit} variant="success"> Update Profile </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="petsUser" >
            {this.state.userPet.map(pet =>
          <section key={pet.id}>
          <article className="card">
  <div className="image">
  <img alt="No picture" key={pet.id} src={pet.picture} alt=""/>
  </div>
  <div className="entry">
    <div className="container">
      <div className="text">
        <h1 className="card-title">{pet.name}</h1>
        <span className="meta"> <TimeAgo date={pet.date_lost}/></span><Badge pill variant="danger" className="button button3">{pet.status}</Badge>
        <p>{pet.species}, {pet.description.breed} </p> <Link to={`/pets/${pet.id}`} className="btn btn-primary">more details</Link>
      </div>
    </div>
  </div>
</article>
</section>
          )}
          </div>
          </div>
          }


          {this.state.current_user_id !== this.state.id &&
            <div className="userProfile">


            <Card className="userInfo">

            <Card.Body className="userCardBody">
            <Col className="userPicture" xs={0} md={0}>
      {currentBadge}
    </Col>
              <Card.Text className="userCardText">
              <div>Name: {this.state.name} <br/> Email: {this.state.email} <br/> Phone Number: {this.state.phone_number} </div>
              </Card.Text>
            </Card.Body>

          </Card>
          <div className="petsUser">
            {this.state.userPet.map(pet =>
          <section key={pet.id}>
          <article className="card">
  <div className="image">
  <img alt="No picture" key={pet.id} src={pet.picture} alt=""/>
  </div>
  <div className="entry">
    <div className="container">
      <div className="text">
        <h1 className="card-title">{pet.name}</h1>
        <span className="meta"> <TimeAgo date={pet.date_lost}/></span><Badge pill variant="danger" className="button button3">{pet.status}</Badge>
        <p>{pet.species}, {pet.description.breed} </p> <Link to={`/pets/${pet.id}`} className="btn btn-primary">more details</Link>
      </div>
    </div>
  </div>
</article>
</section>
          )}
          </div>
          </div>}





      </React.Fragment>
    );
  }
}

export default User;

// {levels  && <img scr="https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/8/85/SeasonalRank1-1.png/140px-SeasonalRank1-1.png?version=ce7c6eea36971495cdad1f06e7ef3709" />}
