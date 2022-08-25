import React from 'react';
import Paypal from './paypal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import { NavLink } from 'react-router-dom';
const baseUrl = 'https://gymmanagementapi.herokuapp.com/api';

export default function Events() {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseUrl + '/events/').then((res) => {
        setEventData(res.data);
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
                <h2>EVENTS</h2>
                <div className="breadcrumb-option">
                  <NavLink to="/">
                    <i className="fa fa-home"></i> Home
                  </NavLink>
                  <span>Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <div
                    className="membership-item my-3"
                    style={{
                      height: '610px',
                      overflow: 'hidden',
                    }}
                  >
                    <div className="mi-title">
                      <h4>{event.name}</h4>
                      <div className="triangle"></div>
                      <img src="{event.image}" alt="" />
                    </div>
                    <h2 className="mi-price">
                      {event.price}
                      <span> USD</span>
                    </h2>
                    <ul>
                      <li>
                        <p>Duration</p>
                        <span>
                          {start_date}
                          <strong className="text-warning fs-3 mx-3">to</strong>
                          {end_date}
                        </span>
                      </li>
                      <li>
                        <p>Description</p>
                        <span>{event.description}</span>
                      </li>
                      <li>
                        <p>Max. No of Attendants</p>
                        <span>{event.capacity}</span>
                      </li>
                    </ul>
                    <p className="fs-3">Buy a Ticket</p>
                    <div className="w-75 mx-auto">
                      <Paypal context={event} type="event" />
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
