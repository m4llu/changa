import React, { useEffect, useState } from 'react';
import './CollectionBanner.scss';
import BannerImage from './BannerImage.svg';

const CollectionBanner: React.FC = () => {
  const [marginTop, setMarginTop] = useState<number>(0);

  useEffect(() => {
    const logoContainer = document.getElementById('logoContainer');
    
    // Check if element exists
    if (!logoContainer) return;

    // Function to update the margin-top value
    const updateMarginTop = () => {
      setMarginTop(logoContainer.clientHeight);
    };

    // Initialize marginTop on mount
    updateMarginTop();

    // Create a ResizeObserver to watch for changes in the logoContainer height
    const resizeObserver = new ResizeObserver(() => {
      updateMarginTop();
    });

    // Start observing the element
    resizeObserver.observe(logoContainer);

    // Cleanup the observer when the component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array to run only once when the component mounts

  // Function to handle scrolling
  const scrollToNextSection = () => {
    const bannerHeight = document.querySelector('.banner')?.clientHeight;
    if (bannerHeight) {
      window.scrollTo({
        top: bannerHeight + 100,
        behavior: 'smooth', // Smooth scrolling
      });
    }
  };

  return (
    <div className="banner" style={{ marginTop: `${marginTop}px` }}>
      <div className="align-center-container">
        <div className="banner-text-container" onClick={scrollToNextSection}>
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

export default CollectionBanner;
