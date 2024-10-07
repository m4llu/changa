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
import DevPage from './components/dev/ProductForm/DevPage';
import Adversitement from './components/features/Adversitement/Adversitement';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState<User | null>(null); // Initialize user as null

    window.scrollTo(0, 0);

    const setColorSchemeMetaTag = (scheme: 'dark' | 'light') => {
      let metaTag = document.querySelector('meta[name="prefers-color-scheme"]');
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'prefers-color-scheme');
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', scheme);
    };
  
    useEffect(() => {
      // Load theme preference from localStorage
      const storedTheme = localStorage.getItem('theme');
      
      if (storedTheme === 'dark') {
        setColorSchemeMetaTag('dark');
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        setColorSchemeMetaTag('light');
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    }, []);
  


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
        <Adversitement />
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
            <Route path="/dev" element={<DevPage/>} />

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
