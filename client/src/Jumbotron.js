import React from 'react'
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import catImageCropped from './assets/catImageCropped.jpg'

const Styles = styled.div`
  .jumbo {
    background: url(${catImageCropped}) no-repeat fixed bottom;
    background-size: cover;
    color: #ccc;
    height: 35rem;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
        <Container>
          <h1>Paw Print!</h1>
          <p>Bringing your pets back together</p>
        </Container>
    </Jumbo>
  </Styles>
)

