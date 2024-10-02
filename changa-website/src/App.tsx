import React, { useEffect, useState } from 'react';
import './scss/main.scss';
import Navbar from './components/layout/Navbar/Navbar';
import useStickyNav from './hooks/useStickyNav';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Discover from './components/pages/Discover/AlbumPage';
import AnnouncementBar from './components/layout/Navbar/AnnouncementBar';
import Footer from './components/layout/Footer/Footer';
import { User } from './types/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState<User | null>(null); // Initialize user as null

  const alwaysShrink = currentPage !== 'home';
  useStickyNav(alwaysShrink);

  useEffect(() => {
    const stickyNav = document.querySelector('.sticky-nav');
    const banner = document.querySelector('.banner');

    window.scrollTo(0, 0);

    if (currentPage === 'home') {
      stickyNav?.classList.remove('shrink');
      banner?.classList.remove('low');
    } else {
      stickyNav?.classList.add('shrink');
      banner?.classList.add('low');
    }

    if (currentPage !== 'home') {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [currentPage]);

  const handleLogin = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData); // Set the entire user object
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData)); // Store the user object in local storage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null); // Reset the user object
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user'); // Remove user from local storage
  };

  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <AnnouncementBar />
        <Navbar 
          isLoggedIn={isLoggedIn} // Pass isLoggedIn prop
          onLogout={handleLogout} // Pass logout function
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />

            {/* Protected Route for Dashboard (Admin only) */}
            <Route
              path="/dashboard"
              element={
            <ProtectedRoute
              redirectPath="/dashboard"
              isAllowed={
                !!user && user.role === '1'
              }
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />       
            {/* Add more routes for other protected pages here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
