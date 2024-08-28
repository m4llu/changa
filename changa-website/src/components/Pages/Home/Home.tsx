import React from 'react';
import Banner from '../../Banner/Banner';
import Sections from '../../Sections/Sections';
import ProductForm from '../../ProductForm/ProductForm';

const Home: React.FC = () => {
    const banner = document.querySelector('.banner');
    banner?.classList.remove('low');
  return (
    <div className="home-page">
      <Banner />
      <Sections />
      <ProductForm />
    </div>
  );
};

export default Home;
