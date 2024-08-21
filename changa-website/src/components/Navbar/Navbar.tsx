import React, { useState } from 'react';
import './Navbar.scss';
import logo from '../../assets/CHANGA.svg';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState); // Toggle menuOpen state
  };

  return (
    <nav className={`sticky-nav ${menuOpen ? 'shrink' : ''}`}>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        <li><a href="#home" className="selected-page">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" id="logo" />
        <h2 className="logo-phrase">Listen to the voices.</h2>
      </div>
    </nav>
  );
};

export default Navbar;
