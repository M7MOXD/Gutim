import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import { NavLink } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api';

export default function Branches() {
  const [branchData, setBranchData] = useState([]);
  useEffect(() => {
    try {
      axios.get(baseUrl + '/branch/').then((res) => {
        setBranchData(res.data);
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
                <h2>Branches</h2>
                <div className="breadcrumb-option">
                  <NavLink to="/">
                    <i className="fa fa-home"></i> Home
                  </NavLink>
                  <span>Branches</span>
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
                <h2>Branches</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {branchData.map((branch) => {
              return (
                <div className="col-lg-4">
                  <div className="membership-item my-3">
                    <div className="mi-title">
                      <h4>{branch.name}</h4>
                      <div className="triangle"></div>
                    </div>
                    <ul>
                      <li>
                        <p>Phone</p>
                        <span>{branch.phone}</span>
                      </li>
                      <li>
                        <p>Address</p>
                        <span>{branch.address}</span>
                      </li>
                    </ul>
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
