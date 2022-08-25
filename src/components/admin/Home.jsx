import React from 'react';
import { NavLink } from 'react-router-dom';
import AdminFooter from './Footer';
import AdminHeader from './Header';
import AdminSideNav from './SideNav';

export default function AdminHome() {
  return (
    <React.Fragment>
      <AdminHeader />
      <AdminSideNav />
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Info boxes */}
            <div className="row">
              <div className="col-6 col-md-4">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-danger elevation-1">
                    <i class="fas fa-code-branch"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">
                      <NavLink to="/admin/branches" className="nav-link">
                        Branches
                      </NavLink>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-success elevation-1">
                    <i class="fas fa-dumbbell"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">
                      <NavLink to="/admin/classes" className="nav-link">
                        Classes
                      </NavLink>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-warning elevation-1">
                    <i className="fas fa-users" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">
                      <NavLink to="/admin/users" className="nav-link">
                        Users
                      </NavLink>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-primary elevation-1">
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">
                      <NavLink to="/admin/events" className="nav-link">
                        Events
                      </NavLink>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-secondary elevation-1">
                    <i class="fas fa-khanda"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">
                      <NavLink to="/admin/trainers" className="nav-link">
                        Trainers
                      </NavLink>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-info elevation-1">
                    <i class="fas fa-sliders-h"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">
                      <NavLink to="/admin/plans" className="nav-link">
                        Plans
                      </NavLink>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <AdminFooter />
    </React.Fragment>
  );
}
