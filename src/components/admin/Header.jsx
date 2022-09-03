import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../redux/reducers/authSlice';
import axios from 'axios';
const baseUrl = 'https://gymmanagementapi.herokuapp.com/api';

export default function AdminHeader() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.value);
  if (localStorage.getItem('refresh')) {
    dispatch(setAuth(true));
  }
  useEffect(() => {
    if (
      localStorage.getItem('is_staff') === 'false' ||
      localStorage.getItem('is_staff') === null
    ) {
      nav('/');
    }
  }, []);
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
  return (
    <React.Fragment>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-dark">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#!"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#!"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li>
            <button className="btn btn-outline-danger" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}
