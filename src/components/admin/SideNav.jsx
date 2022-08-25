import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminSideNav() {
  return (
    <React.Fragment>
      <aside className="main-sidebar sidebar-dark-primary elevation-4 position-fixed">
        <NavLink to="/admin" className="brand-link">
          <img
            src="/dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: '.8' }}
          />
          <span className="brand-text font-weight-light">Admin Panel</span>
        </NavLink>
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon classwith font-awesome or any other icon font library */}
              <li className="nav-item">
                <NavLink to="/admin" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/branches" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Branches</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/classes" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Classes</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/trainers" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Trainers</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/events" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Events</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/users" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Users</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/plans" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Plans</p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </React.Fragment>
  );
}
