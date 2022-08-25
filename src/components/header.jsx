import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../redux/reducers/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

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
        dispatch(setAuth(false));
        console.log(res);
        nav('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <header className="header-section">
        <div className="container">
          <div className="logo">
            <NavLink to="/">
              <img src="img/logo.png" alt="" />
            </NavLink>
          </div>
          <div className="nav-menu">
            <nav className="mainmenu mobile-menu">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/branch">Branches</NavLink>
                </li>
                <li>
                  <NavLink to="/classes">Classes</NavLink>
                </li>
                <li>
                  <NavLink to="/event">Events</NavLink>
                </li>
                <li>
                  <NavLink to="/gallery">Gallery</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
              </ul>
            </nav>
            {!auth && (
              <NavLink to="/signup" className="primary-btn signup-btn">
                Sign Up Today
              </NavLink>
            )}
            {!auth && (
              <NavLink to="/login" className="primary-btn signup-btn">
                Login
              </NavLink>
            )}
            {localStorage.getItem('is_staff') === 'true' && (
              <NavLink
                to="/admin"
                className="btn btn-outline-danger signup-btn"
              >
                Admin
              </NavLink>
            )}
            {auth && (
              <button
                className="btn btn-outline-danger signup-btn"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
          <div id="mobile-menu-wrap"></div>
        </div>
      </header>
    </React.Fragment>
  );
}
