import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";

const Footer = () => {


  return (
      <footer class="footer">
  <div class="footer-left col-md-4 col-sm-6">
    <p class="about">
      <span> About us</span> We're a bunch of freshly-out-of-bootcamp junior developers who gave themselves the mission to reunite every lost pets and their owners in Montreal. And we will not stop until we reach our goal!
    </p>
    <div class="icons">
      <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
      <a href="#"><i class="fab fa-linkedin"></i></a>
      <a href="#"><i class="fab fa-google-plus"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
    </div>
  </div>
  <div class="footer-center col-md-4 col-sm-6">
    <div>
      <i class="fa fa-map-marker"></i>
      <p><span> 5455 rue de Gaspé</span> Montréal, Québec</p>
    </div>
    <div>
      <i class="fa fa-phone"></i>
      <p> (+01) 555-527-8431</p>
    </div>
    <div>
      <i class="fa fa-envelope"></i>
      <p><a href="#"> pawprints@gmail.com</a></p>
    </div>
  </div>
  <div class="footer-right col-md-4 col-sm-6">
    <h2><span> <img
        src="https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/PPFINAL_FOREAL.png?alt=media&token=415a72bd-1052-4142-9672-c3fad50ea0fa"
        width="133"
        height="67"
        className="d-inline-block align-top"
        alt=""
      /></span></h2>
    <p class="menu">
      <a href="#"> Home&nbsp;&nbsp;</a>
      <a href="#"> About&nbsp;&nbsp;</a>
      <a href="#"> Services&nbsp;&nbsp;</a>
      <a href="#"> Contact&nbsp;&nbsp;</a>
    </p>
    <p class="name"> Paw Prints &copy; 2019</p>
  </div>
</footer>
  );
};

export default Footer;
