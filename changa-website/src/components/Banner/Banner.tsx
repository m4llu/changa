import React from 'react';
import './Banner.scss';
import BannerImage from './BannerImage.svg';

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <div className="align-center-container">
        <div className="banner-text-container">
          <div className="top">
            <div className="top-start">THE</div>
            <div className="top-end">KANYE EAST</div>
          </div>
          <div className="bottom">
            <div className="bottom-start"></div>
            <div className="bottom-end">COLLECTION</div>
          </div>
          <div className="paragraph">
            <p>Äijän leuka meni lattiiaan asti ( BOOOUUUUUU )</p>
          </div>
        </div>
        <img src={BannerImage} alt="Kanye West" className="banner-image" />
      </div>
    </div>
  );
};

export default Banner;
