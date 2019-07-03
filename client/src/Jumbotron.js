import React from 'react'
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import catImageCropped from './assets/catImageCropped.jpg'

const Styles = styled.div`
  .jumbo {
    background: url(${catImageCropped}) no-repeat fixed bottom;
    background-size: cover;
    color: #ccc;
    height: 20rem;
    position: relative;
    z-index: -2;
  }

  .overlay {    
    position: absolute;
    top: 0;
    left: 0;
    bottom: 25rem;
    right: 0;
    z-index: -1;
  }

`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
        <Container>
          <h1>Paw Prints</h1>
          <p>Reuniting pets with their owners</p>
        </Container>
    </Jumbo>
  </Styles>
)

