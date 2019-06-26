import React, { Component } from 'react'
import { Container, Col, Image, Row } from 'react-bootstrap'
import petOwner1 from './assets/petOwner1.jpg';
import petOwner2 from './assets/petOwner2.jpg';
import petOwner3 from './assets/petOwner3.jpg';
import './App.scss'
import Navigationbar from './Navigationbar.js'

export default class Success extends Component {
  render() {
    return(
      <div>
        
        <Image src="" className=""/>
        <Container>
          <Row className="show-grid text-center">
              <Col xs={12} sm={4} className="person-wrapper">
                <Image src={petOwner1} circle className="profile-pic" />
                <h3> Santa Paws </h3>
                <p>Make plans to dominate world and then take a nap eat owner's food. Purr when give birth disappear for four days and return home with an expensive injury; bite the vet. Loved it, hated it, loved it, hated it cats secretly make all the worlds muffins i just saw other cats inside the house and nobody ask me before using my litter box for meow, and fall asleep upside-down cats woo make plans to dominate world and then take a nap. Stare at guinea pigs.</p>
              </Col>  
              <Col xs={12} sm={4} className="person-wrapper">
                <Image src={petOwner2} circle className="profile-pic" />
                <h3> Hello Kitty </h3>
                <p>Look at dog hiiiiiisssss fall over dead (not really but gets sypathy) yet leave hair on owner's clothes eat a plant, kill a hand yet do not try to mix old food with new one to fool me!, cat cat moo moo lick ears lick paws, for hide when guests come over. Attack feet run off table persian cat jump eat fish paw at your fat belly. Small kitty warm kitty little balls of fur ptracy, so look at dog hiiiiiisssss.</p>
              </Col>  
              <Col xs={12} sm={4} className="person-wrapper">
                <Image src={petOwner3} circle className="profile-pic" />
                <h3> Chew Barka </h3>
                <p>Bite nose of your human meowing non stop for food, but curl up and sleep on the freshly laundered towels taco cat backwards spells taco cat so experiences short bursts of poo-phoria after going to the loo yet get my claw stuck in the dog's ear, chase laser.</p>
              </Col>  
            </Row>
        </Container>
      </div>
    )
  }
}