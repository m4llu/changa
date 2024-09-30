import React from 'react';
import Banner from '../../Banner/Banner';
import SearchableProductList from './HomeProductSection/HomeProductSection';
import ProductForm from '../../ProductForm/ProductForm';
import ArtistListBanner from './ArtistListBanner/ArtistListBanner';

const Home: React.FC = () => {
    const banner = document.querySelector('.banner');
    banner?.classList.remove('low');
  return (
    <div className="home-page">
      <Banner />
      <ArtistListBanner />
      <SearchableProductList />
      <ProductForm />
    </div>
  );
};

export default Home;
