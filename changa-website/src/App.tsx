import React, { useEffect, useState } from 'react';
import './scss/main.scss';

import Navbar from './components/Navbar/Navbar';
import useStickyNav from './hooks/useStickyNav';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login';
import Discover from './components/Pages/Discover/Discover';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const stickyNav = document.querySelector('.sticky-nav');
  const banner = document.querySelector('.banner');
  const alwaysShrink = currentPage != 'home' ? true : false;
  useStickyNav(alwaysShrink);

  useEffect(() => {
      if (currentPage === 'home') {
        stickyNav?.classList.remove('shrink');
        banner?.classList.remove('low');
      }
      else {
        stickyNav?.classList.add('shrink');
        banner?.classList.add('low');
      }
      window.scrollTo(0, 0);
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
