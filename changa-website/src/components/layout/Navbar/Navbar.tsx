import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Use NavLink instead of Link
import './Navbar.scss';
import logo from '../../../assets/images/CHANGA.svg';
import { User } from '../../../types/User';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user: User = JSON.parse(userData);
      setUserName(user.name);
    }
  }, [isLoggedIn]);

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <nav className="sticky-nav">
      <div className="hamburger" onClick={() => { /* Toggle menu logic */ }}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'selected-page' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/discover"
            className={({ isActive }) => (isActive ? 'selected-page' : '')}
          >
            Find
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'selected-page' : '')}
          >
            About
          </NavLink>
        </li>
        <li>
          {isLoggedIn ? (
            <span onClick={onLogout} className="user-name">{userName}</span>
          ) : (
            <a onClick={handleSignInClick} className="login-link">Login</a>
          )}
        </li>
      </ul>
      <div className="logo-container" id='logoContainer'>
        <img src={logo} alt="Logo" className="logo" id="logo" />
        <h2 className="logo-phrase">Listen to the voices.</h2>
      </div>
    </nav>
  );
};

export default Navbar;
