import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../redux/reducers/authSlice';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export default function Google() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  function handelCallbackResponse(res) {
    console.log(res);
    axios
      .post('http://localhost:8000/api/users/google/', {
        auth_token: res.credential,
      })
      .then((res) => {
        localStorage.setItem(
          'user_id',
          jwt_decode(res.data.tokens.refresh).user_id
        );
        localStorage.setItem('refresh', res.data.tokens.refresh);
        localStorage.setItem('access', res.data.tokens.access);
        localStorage.setItem('is_staff', 'false');
        dispatch(setAuth(true));
        nav('/');
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        '969780072688-i0icr3imsmc17jbe192odp4kdco6rb4f.apps.googleusercontent.com',
      callback: (res) => handelCallbackResponse(res),
    });
    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        theme: 'outline',
        size: 'large',
      }
    );
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-3">
            <div id="signInDiv"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
