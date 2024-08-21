import React from 'react';
import './Navbar.css';
import logo from '../../assets/CHANGA.svg';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky-nav">
      <ul>
        <li><a href="#home" className="selected-page">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="logo-container">
        <img src={logo}alt="Logo" className="logo" id="logo" />
        <h2 className="logo-phrase">Listen to the voices.</h2>
      </div>
    </nav>
  );
};

export default Navbar;
