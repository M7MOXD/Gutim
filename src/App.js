import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Home from './components/home';
import Branches from './components/branch';
import Classes from './components/classes';
import Events from './components/event';
import Gallery from './components/gallery';
import About from './components/about';
import Login from './components/login';
import Signup from './components/signup';
import Confirmation from './components/confirmation';
import UserProfile from './components/userProfile';
import AdminHome from './components/admin/Home';
import AdminBranches from './components/admin/Branches';
import AdminUsers from './components/admin/Users';
import AdminTrainers from './components/admin/Trainers';
import AdminEvents from './components/admin/Events';
import AdminClasses from './components/admin/Classes';
import AdminPlans from './components/admin/Plans';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to={'home'} />} />
        <Route path="home" element={<Home />} />
        <Route path="branch" element={<Branches />} />
        <Route path="classes" element={<Classes />} />
        <Route path="event" element={<Events />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="profile" element={<UserProfile />} />

        <Route path="admin" element={<AdminHome />} />
        <Route path="admin/branches" element={<AdminBranches />} />
        <Route path="admin/users" element={<AdminUsers />} />
        <Route path="admin/trainers" element={<AdminTrainers />} />
        <Route path="admin/events" element={<AdminEvents />} />
        <Route path="admin/classes" element={<AdminClasses />} />
        <Route path="admin/plans" element={<AdminPlans />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
