import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import logo from '../../assets/CHANGA.svg';

interface NavbarProps {
  onNavClick: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, currentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 728) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set correct state

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
        <li>
          <a 
            onClick={() => onNavClick('home')} 
            className={currentPage === 'home' ? 'selected-page' : ''}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            onClick={() => onNavClick('discover')} 
            className={currentPage === 'discover' ? 'selected-page' : ''}
          >
            Find
          </a>
        </li>
        <li>
          <a 
            onClick={() => onNavClick('about')} 
            className={currentPage === 'about' ? 'selected-page' : ''}
          >
            About
          </a>
        </li>
        <li>
          <a 
            onClick={() => onNavClick('login')} 
            className={currentPage === 'login' ? 'selected-page' : ''}
          >
            Sign In
          </a>
        </li>
      </ul>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" id="logo" />
        <h2 className="logo-phrase">Listen to the voices.</h2>
      </div>
    </nav>
  );
};

export default Navbar;
