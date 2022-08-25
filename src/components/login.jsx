import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setAuth } from '../redux/reducers/authSlice';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import Google from './google';
const baseUrl = 'https://gymmanagementapi.herokuapp.com/api';

export default function Login() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.value);
  useEffect(() => {
    if (auth) {
      nav('/');
    }
  }, []);
  const [error, setError] = useState({});
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const getUsername = (e) => {
    setState({
      ...state,
      username: e.target.value,
    });
  };
  const getPassword = (e) => {
    setState({
      ...state,
      password: e.target.value,
    });
  };
  const submitLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/users/login/`, state)
      .then((res) => {
        let tokens = JSON.parse(res.data.tokens.replace(/'/g, '"'));
        localStorage.setItem('user_id', jwt_decode(tokens.refresh).user_id);
        localStorage.setItem('refresh', tokens.refresh);
        localStorage.setItem('access', tokens.access);
        localStorage.setItem('is_staff', res.data.is_staff);
        setError({});
        dispatch(setAuth(true));
        nav('/');
      })
      .catch((err) => setError(err));
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
                <h2>Login</h2>
                <div className="breadcrumb-option">
                  <a href="./index.html">
                    <i className="fa fa-home"></i> Home
                  </a>
                  <span>Login</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="w-75 mx-auto"
        style={{
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <main className="form-signin w-100 m-auto">
          <form onSubmit={submitLogin}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Jxhn"
                onChange={getUsername}
              />
              <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating my-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={getPassword}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <p className="text-danger">
              {error?.response?.data?.detail ===
              'Your email address is not verified' ? (
                <>
                  {error?.response?.data?.detail}
                  <NavLink to="/confirmation"> Verifiy Your Email</NavLink>
                </>
              ) : (
                error?.response?.data?.detail
              )}
            </p>
            <button className="w-100 btn btn-lg btn-outline-dark" type="submit">
              Sign in
            </button>
          </form>
          <p className="my-3">Or Sign in With Google</p>
          <Google />
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
}
