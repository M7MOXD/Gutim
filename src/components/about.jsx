import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import { NavLink } from 'react-router-dom';
const baseUrl = 'https://gymmanagementapi.herokuapp.com/api';

export default function About() {
  const [trainerData, setTrainerData] = useState([]);
  useEffect(() => {
    try {
      axios.get(baseUrl + '/trainers/').then((res) => {
        setTrainerData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <React.Fragment>
      <Header />
      <section
        className="breadcrumb-section"
        style={{
          background: 'url(img/breadcrumb/classes-breadcrumb.jpg)',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>About</h2>
                <div className="breadcrumb-option">
                  <NavLink to="/">
                    <i className="fa fa-home"></i> Home
                  </NavLink>
                  <span>About</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-pic">
                <img src="img/about-pic.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-text">
                <h2>Story About Us</h2>
                <p className="first-para">
                  <strong>
                    Our clubs are well equipped, conveniently situated and home
                    to some of the friendliest faces in the fitness industry.
                  </strong>
                </p>
                <p className="second-para">
                  We will always try to make every individual that makes up our
                  diverse membership feel right at home when using our cubs.
                  Wherever you are starting from, we’re by your side to help you
                  meet your health and fitness goals.
                </p>
                <img src="img/about-signature.png" alt="" />
                <div className="at-author">
                  <h4>Lettie Chavez</h4>
                  <span>CEO - Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gym-award spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="award-text">
                <h2>Our Gym Award</h2>
                <p>
                  Gutim. Gym is the winner of this year's Global Franchise Award
                  for Best Fitness Franchise, marking the second consecutive
                  year the brand has been recognized as the overall winner of
                  this award in its category.
                </p>
                <p>
                  The award is presented annually to the individual who best
                  exemplifies the principles on which our team built Gutim. Gym.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <img src="img/award.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="banner-section"
        style={{
          background: 'url(img/banner-bg.jpg)',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-text">
                <h2>Get training today</h2>
                <p>
                  Just like you, we’re passionate about working out and staying
                  fit.We’ve learned a thing or two about nutrition, strength
                  training, weight loss, and how to have fun staying active. Let
                  us share our knowledge!
                </p>
                <NavLink to="/about" className="primary-btn banner-btn">
                  Know More
                </NavLink>
              </div>
            </div>
            <div className="col-lg-5">
              <img src="img/banner-person.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}
