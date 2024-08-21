import React from 'react';
import './App.css';
import './scss/main.scss';

import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Sections from './components/Sections/Sections';
import useStickyNav from './hooks/useStickyNav';

const App: React.FC = () => {
  useStickyNav();

  return (
    <div className="App">
      <Navbar />
      <main>
        <Banner />
        <Sections />
      </main>
    </div>
  );
};

export default App;
