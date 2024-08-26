import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import logo from '../../assets/CHANGA.svg';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  // useEffect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 728) {
        setMenuOpen(false);
      }
    };

    // attach the event listener
    window.addEventListener('resize', handleResize);

    // call the resize handler initially to set the correct state
    handleResize();

    // cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={`sticky-nav ${menuOpen ? 'shrink' : ''}`}>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        <li><a href="#home" className="selected-page">Home</a></li>
        <li><a href="#about">Discover</a></li>
        <li><a href="#services">About</a></li>
        <li><a href="#contact">Sign In</a></li>
      </ul>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" id="logo" />
        <h2 className="logo-phrase">Listen to the voices.</h2>
      </div>
    </nav>
  );
};

export default Navbar;
