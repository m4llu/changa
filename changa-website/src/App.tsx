import React from 'react';
import './App.css';
import './styles/Global.css';

import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import ItemList from './components/ItemList/ItemList';
import Sections from './components/Sections/Sections';
import useStickyNav from './hooks/useStickyNav';

const App: React.FC = () => {
  useStickyNav();

  return (
    <div className="App">
      <Navbar />
      <main>
        <Banner />
        <ItemList />
        <Sections />
      </main>
    </div>
  );
};

export default App;
