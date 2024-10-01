import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import logo from '../../../assets/images/CHANGA.svg';
import { User } from '../../../types/User';

interface NavbarProps {
  onNavClick: (page: string) => void;
  currentPage: string;
  isLoggedIn: boolean; // New prop to check if user is logged in
  onLogout: () => void; // New prop for logout function
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, currentPage, isLoggedIn, onLogout }) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user'); // Retrieve user data from local storage
    if (userData) {
      const user: User = JSON.parse(userData); // Parse the user object
      setUserName(user.name); // Set the user's name
    }
  }, [isLoggedIn]); // Run this effect whenever the login state changes

  const handleSignInClick = () => {
    onNavClick('login'); // Navigate to login page
  };

  return (
    <nav className={`sticky-nav`}>
      <div className="hamburger" onClick={() => { /* Toggle menu logic */ }}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul>
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
          {isLoggedIn ? (
            <span onClick={onLogout} className="user-name">{userName}</span> // Display user's name from state
          ) : (
            <a onClick={handleSignInClick} className="login-link">Login</a>
          )}
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
