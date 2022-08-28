import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <React.Fragment>
      <section className="footer-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="footer-banner-item"
                style={{
                  background: 'url(img/footer-banner/footer-banner-1.jpg)',
                }}
              >
                <span>New member</span>
                <h2>7 days for free</h2>
                <p>
                  Complete the training sessions with us, surely you will be
                  happy
                </p>
                <NavLink to="/signup" className="primary-btn">
                  Join Us Now
                </NavLink>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="footer-banner-item"
                style={{
                  background: 'url(img/footer-banner/footer-banner-2.jpg)',
                }}
              >
                <span>contact us</span>
                <h2>+20 3 746 204</h2>
                <p>WE'D LOVE TO HEAR FROM YOU!</p>
                <NavLink to="/about" className="primary-btn">
                  Know More
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="contact-option">
                <span>Phone</span>
                <p>(203) 118 9999 - (203) 118 9999</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-option">
                <span>Address</span>
                <p>7 San Stifano, Alexandria, Egypt</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-option">
                <span>Email</span>
                <p>contact@Gutim.com</p>
              </div>
            </div>
          </div>
          <div className="copyright-text">
            <p>
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script>
              All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
