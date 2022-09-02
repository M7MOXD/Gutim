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
  const [planData, setPlanData] = useState({});
  const [eventData, setEventData] = useState([]);
  const [classData, setClassData] = useState([]);

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
        localStorage.setItem('username', res.data.user);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${baseUrl}/sub/subscription/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then((res) => {
        axios
          .get(`${baseUrl}/sub/plan/${res.data[0]?.plan_id}`)
          .then((xres) => {
            setPlanData({ ...xres.data, del_id: res.data[0].id });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    axios
      .get(`${baseUrl}/events/participants/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then((res) => {
        setEventData(
          res.data.filter((e) => {
            return e.participant === localStorage.getItem('username');
          })
        );
      })
      .catch((err) => console.log(err));

    axios
      .get(`${baseUrl}/classes/attendant/list/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then((res) => {
        setClassData(
          res.data.filter((e) => {
            return e.attendant === localStorage.getItem('username');
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const cancel = (type, data) => {
    if (type === 'plan') {
      axios
        .delete(`${baseUrl}/sub/subscription/${data}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        })
        .then((res) => {
          setPlanData({});
        });
    } else if (type === 'class') {
      axios
        .post(
          `${baseUrl}/classes/attendant/unsubscribe/`,
          {
            clas: data,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
          }
        )
        .then((res) => {
          setClassData(
            classData.filter((x) => {
              return x.clas !== data;
            })
          );
        });
    } else if (type === 'event') {
      axios
        .post(
          `${baseUrl}/events/participants/unsubscribe/`,
          {
            event: data,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
          }
        )
        .then((res) => {
          setEventData(
            eventData.filter((x) => {
              return x.event !== data;
            })
          );
        });
    }
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

      <section className="membership-section spad" class="my-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>MEMBERSHIP PLAN</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {planData.id && (
              <div className="col-lg-4">
                <div
                  className="membership-item my-3"
                  style={{
                    height: '420px',
                    overflow: 'hidden',
                  }}
                >
                  <div className="mi-title">
                    <h4>{planData.name}</h4>
                    <div className="triangle"></div>
                  </div>
                  <h2 className="mi-price">
                    {Math.round(planData.price)}
                    <span> USD /mo</span>
                  </h2>
                  <ul>
                    <li>
                      <p>Duration</p>
                      <span>{planData.duration_months} Month</span>
                    </li>
                  </ul>
                  <div className="w-75 mx-auto mt-5">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => cancel('plan', planData.del_id)}
                    >
                      Unsubscribe
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <hr className="text-danger" />
      <section className="membership-section spad" class="my-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Events</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {eventData.map((event) => {
              try {
                var start_date = event.start_date.slice(0, 10);
                var end_date = event.end_date.slice(0, 10);
              } catch {}

              return (
                <div className="col-lg-4">
                  <div className="membership-item my-3">
                    <div className="mi-title">
                      <h4>{event.event}</h4>
                      <div className="triangle"></div>
                      <img src="{event.image}" alt="" />
                    </div>
                    <p className="fs-3">Buy a Ticket</p>
                    <div className="w-75 mx-auto mt-5">
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => cancel('event', event.event)}
                      >
                        Unsubscribe
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <hr className="text-danger" />
      <section className="classes-section classes-page spad" class="my-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>UNLIMITED CLASSES</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {classData.map((cls, i) => {
              if (i > 8) {
                i = 0;
              }
              return (
                <div className="col-lg-4 col-md-6 mb-5">
                  <div className="single-trainer-item">
                    <img
                      src={`img/classes/classes-${i > 8 ? i - 1 : i + 1}.jpg`}
                      alt=""
                    />
                    <div className="trainer-text">
                      <h5>{cls.clas}</h5>
                      <span>More Info</span>
                      <div className="w-75 mx-auto mt-5">
                        <button
                          className="btn btn-danger w-100"
                          onClick={() => cancel('class', cls.clas)}
                        >
                          Unsubscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}
