import React, { useEffect, useState } from 'react';
import './scss/main.scss';

import Navbar from './components/Navbar/Navbar';
import useStickyNav from './hooks/useStickyNav';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login';
import Discover from './components/Pages/Discover/AlbumPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const alwaysShrink = currentPage !== 'home';
  
  useStickyNav(alwaysShrink);

  useEffect(() => {
    const stickyNav = document.querySelector('.sticky-nav');
    const banner = document.querySelector('.banner');

    // Scroll to top when page changes
    window.scrollTo(0, 0);

    // Handle navbar shrink based on the current page
    if (currentPage === 'home') {
      stickyNav?.classList.remove('shrink');
      banner?.classList.remove('low');
    } else {
      stickyNav?.classList.add('shrink');
      banner?.classList.add('low');
    }

    // Conditionally set overflow-y hidden
    if (currentPage !== 'home') {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    // Cleanup when component unmounts or currentPage changes
    return () => {
      document.body.style.overflowY = 'auto'; // Reset to default when leaving the login page
    };
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'discover':
        return <Discover />;
      case 'about':
        return <Home />;
      case 'login':
        return <Login />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navbar onNavClick={setCurrentPage} currentPage={currentPage} /> {/* Pass currentPage prop */}
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
