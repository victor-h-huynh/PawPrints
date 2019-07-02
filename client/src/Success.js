import React, { Component } from 'react'
import petOwner1 from './assets/petOwner1.jpg';
import petOwner2 from './assets/petOwner2.jpg';
import petOwner3 from './assets/petOwner3.jpg';
import dogIcon1 from  './assets/dogIcon1.svg';
import dogIcon2 from  './assets/dogIcon2.svg';
import './App.scss'

class Success extends Component {
  render () {
    return (

        <React.Fragment>
          <section className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div id="headingGroup" className="text-black text-center d-none d-lg-block mt-5">
                  <h1 className="display-2">Success<span>/</span>Stories</h1>
                  <h1 className="display-2">Success<span>/</span>Stories</h1>
                  <h1 className="display-2">Success<span>/</span>Stories</h1>
                  <h1 className="display-2">Success<span>/</span>Stories</h1>
                  <h1 className="display-2">Success<span>/</span>Stories</h1>
                  <h1 className="display-2">Success<span>/</span>Stories</h1>
                  <h1 className="display-2">Success<span>/</span>Stories</h1>
                </div>
              </div>
              <div className="col-lg-6">
                <img className="img-fluid1" src={petOwner1} alt="petOwner1"></img>
              </div>
            </div>
          </section>
        
          <section className="container-fluid">
            <div className="row align-items-center content">
              <div className="col-md-6 order-2 order-md-1">
                <img className="img-fluid2" src={petOwner2} alt="petOwner2"></img>
              </div>
              <div className="col-md-6 text-center order-1 order-md-2">
                <div className="row justify-content-center">
                  <div className="col-10 col-lg-8 secondSection mb-5 mb-md-0">
                  <h2>Justine Louise</h2>
                    <img className="successIcon d-none d-lg-inline" src={dogIcon1} alt="" ></img>
                    <p className="lead">"I recommend Paw Prints to anyone who misses their pet dearly. I cannot believe how quick and easy it was!" </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row align-items-center content">
              <div className="col-md-6 text-center">
                <div className="row justify-content-center">
                  <div className="col-10 col-lg-8 thirdSection mb-5 mb-md-0">
                  <h2>Fred Douglas</h2>
                    <img className="successIcon d-none d-lg-inline" src={dogIcon2} alt=""></img>
                    <p className="lead">"I was so afraid that I lost Chew Barka, but thanks to Paw Prints we found him in a day!"</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <img className="img-fluid3" src={petOwner3} alt="petOwner3"></img>
              </div>
            </div>
          </section>
          
        </React.Fragment>
        
          
        
    )
  }
}

export default Success;