import React from 'react';
import Paypal from './paypal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import { NavLink } from 'react-router-dom';
const baseUrl = 'https://gymmanagementapi.herokuapp.com/api';

export default function Classes() {
  const [classData, setClassData] = useState([]);
  useEffect(() => {
    try {
      axios.get(baseUrl + '/classes/').then((res) => {
        setClassData(res.data);
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
                <h2>Classes</h2>
                <div className="breadcrumb-option">
                  <NavLink to="/">
                    <i className="fa fa-home"></i> Home
                  </NavLink>
                  <span>Class</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                      <h5>{cls.name}</h5>
                      <span>
                        <i className="fa fa-money"></i> {cls.price}
                        USD /mo
                      </span>
                      <p>{cls.description} </p>
                      <div className="w-75 mx-auto">
                        <Paypal context={cls} type="class" />
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
