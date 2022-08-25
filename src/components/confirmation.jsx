import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate, NavLink } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

export default function Confirmation() {
  const auth = useSelector((state) => state.auth.value);
  const nav = useNavigate();
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const token = searchParams.get('token');
  if (auth) {
    nav('/');
  }
  if (token) {
    axios
      .get(`${baseUrl}/users/verify-email/?token=${token}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const submitResend = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/users/resend-verify-email/`, {
        email,
      })
      .then((res) => setError(''))
      .catch((err) => setError(err));
    document.querySelector('#floatingInput').value = '';
  };
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
                <h2>Confirmation</h2>
                <div className="breadcrumb-option">
                  <NavLink to="/">
                    <i className="fa fa-home"></i> Home
                  </NavLink>
                  <span>Confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {token && (
        <div className="container">
          <h1 className="text-center m-5">
            Your email Has Been <span className="text-success">Verified</span>
          </h1>
          <div className="text-center">
            <img src="/images/goodbye.jpeg" alt="" />
          </div>
        </div>
      )}
      {!token && (
        <React.Fragment>
          <div className="container">
            <h1 className="text-center m-5">
              Thanks for Registring at{' '}
              <span className="text-success">Gutim </span>
              Please Verify your email.
            </h1>
            <div className="text-center">
              <img src="/images/goodbye.jpeg" alt="" />
            </div>
          </div>
          <form onSubmit={submitResend} className="w-50 mx-auto mb-5">
            <h1 className="h3 mb-3 fw-normal">Re-send Verifiy Email</h1>
            <div className="form-floating my-2">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={getEmail}
              />
              <label for="floatingInput">Email</label>
            </div>
            <p className="text-danger">{error?.response?.data?.email}</p>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Submit
            </button>
          </form>
        </React.Fragment>
      )}
      <Footer />
    </React.Fragment>
  );
}
