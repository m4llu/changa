import React from 'react';
import Banner from '../../Banner/Banner';
import Sections from '../../Sections/Sections';

const Home: React.FC = () => {
    const banner = document.querySelector('.banner');
    banner?.classList.remove('low');
  return (
    <div className="home-page">
      <Banner />
      <Sections />
    </div>
  );
};

export default Home;
