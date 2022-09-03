import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../redux/reducers/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseUrl = 'https://gymmanagementapi.herokuapp.com/api';

export default function Header() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.value);
  if (localStorage.getItem('refresh')) {
    dispatch(setAuth(true));
  }
  if (auth) {
    setInterval(() => {
      axios
        .post(
          `${baseUrl}/users/token/refresh/`,
          {
            refresh: localStorage.getItem('refresh'),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
          }
        )
        .then((res) => {
          localStorage.setItem('access', res.data.access);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 120000);
  }
  const logout = () => {
    axios
      .post(
        `${baseUrl}/users/logout/`,
        {
          refresh: localStorage.getItem('refresh'),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      )
      .then((res) => {
        localStorage.removeItem('refresh');
        localStorage.removeItem('access');
        localStorage.removeItem('user_id');
        localStorage.removeItem('is_staff');
        localStorage.clear();
        dispatch(setAuth(false));
        nav('/');
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        dispatch(setAuth(false));
        nav('/');
      });
  };
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <React.Fragment>
      <header className="header-section">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-transparent">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/">
                <img src="img/logo.png" alt="" />
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/home">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/branch">
                      Branches
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/classes">
                      Classes
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/event">
                      Events
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/gallery">
                      Gallery
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/about">
                      About
                    </NavLink>
                  </li>
                </ul>
                <div className="d-flex flex-column flex-lg-row">
                  {!auth && (
                    <NavLink
                      to="/signup"
                      className="primary-btn nav-link text-light me-2 mb-2"
                    >
                      Sign Up Today
                    </NavLink>
                  )}
                  {!auth && (
                    <NavLink
                      to="/login"
                      className="primary-btn nav-link text-light"
                    >
                      Login
                    </NavLink>
                  )}
                  {localStorage.getItem('is_staff') === 'true' && (
                    <NavLink
                      to="/admin"
                      className="primary-btn nav-link text-light me-2 mb-2"
                    >
                      Admin
                    </NavLink>
                  )}
                  {localStorage.getItem('is_staff') === 'false' && (
                    <NavLink
                      to="/profile"
                      className="primary-btn nav-link text-light me-2 mb-2"
                    >
                      Profile
                    </NavLink>
                  )}
                  {auth && (
                    <button
                      className="primary-btn nav-link text-light"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
}
