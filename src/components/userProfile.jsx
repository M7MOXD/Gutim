import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import axios from 'axios';
const baseUrl = 'https://gymmanagementapi.herokuapp.com/api';

export default function UserProfile() {
  const nav = useNavigate();
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({});

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitForm = () => {
    axios
      .patch(
        `${baseUrl}/users/profile/${localStorage.getItem('user_id')}/`,
        userData,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      )
      .then((res) => {
        setUserData({});
        setProfileData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (
      localStorage.getItem('is_staff') === 'true' ||
      localStorage.getItem('is_staff') === null
    ) {
      nav('/');
    }
    axios
      .get(`${baseUrl}/users/profile/${localStorage.getItem('user_id')}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then((res) => {
        setProfileData(res.data);
      })
      .catch((err) => console.log(err));
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
                <h2>profile</h2>
                <div className="breadcrumb-option">
                  <NavLink to="/">
                    <i className="fa fa-home"></i> Home
                  </NavLink>
                  <span>Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="my-3">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={profileData.image}
                        alt=""
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {profileData.user}
                    </h3>
                    <p className="text-muted text-center">Trainee</p>
                    <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>Phone</b>{' '}
                        <a className="float-right">{profileData.phone}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Age</b>{' '}
                        <a className="float-right">{profileData.age}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Height</b>{' '}
                        <a className="float-right">{profileData.height}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Weight</b>{' '}
                        <a className="float-right">{profileData.weight}</a>
                      </li>
                      <li className="list-group-item">
                        <b>BMI</b>{' '}
                        <a className="float-right">{profileData.bmi}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Gender</b>{' '}
                        <a className="float-right">{profileData.gender}</a>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-center">
                      <a
                        className="btn btn-danger w-50"
                        data-toggle="modal"
                        data-target="#editProfile"
                      >
                        Edit Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-9">
                <div
                  className="modal fade"
                  id="editProfile"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <ul className="nav nav-pills">
                          <li className="nav-item">Edit Profile</li>
                        </ul>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="tab-content">
                          <div className="active tab-pane" id="editProfile">
                            <form className="form-horizontal">
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Age
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="age"
                                    placeholder="Age"
                                    defaultValue={profileData.age}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Phone
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    placeholder="Phone"
                                    defaultValue={profileData.phone}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Height
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="height"
                                    placeholder="Height"
                                    defaultValue={profileData.height}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Weight
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="weight"
                                    placeholder="Weight"
                                    defaultValue={profileData.weight}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Image
                                </label>
                                <input
                                  className="col-sm-10"
                                  name="image"
                                  type="file"
                                  onChange={handleFileChange}
                                />
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                  Gender
                                </label>
                                <div className="col-sm-10">
                                  <select
                                    name="gender"
                                    className="form-select"
                                    onChange={handleChange}
                                  >
                                    <option>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                  </select>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          data-dismiss="modal"
                          className="btn btn-primary"
                          onClick={submitForm}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
}
