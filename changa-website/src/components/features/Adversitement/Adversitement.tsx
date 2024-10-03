import React, { useState, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import './Adversitement.scss';
import Button from '../../common/Button/Button';

const Adversitement: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    const targetElement = document.body;
    if (isPopupVisible) {
      disableBodyScroll(targetElement);
    } else {
      enableBodyScroll(targetElement);
    }
    
    // Clean up on unmount to re-enable scrolling
    return () => enableBodyScroll(targetElement);
  }, [isPopupVisible]);

  return isPopupVisible ? (
    <div className="adversitement-container">
      <div className="popup">
        <div className="popup-content">
          <h2 className='changa'>Spin & Win</h2>
          <div className="wheel">
            {/* Placeholder for the spin & win wheel */}
            <p>Wheel goes here</p>
          </div>
          <Button variant='tertiary' fullWidth={true} onClick={closePopup}>
            Spin Now
          </Button>
        </div>
      </div>
      <div className="content">
        {/* Your main content goes here */}
        <p>Main content of the page</p>
      </div>
    </div>
  ) : null;
};

export default Adversitement;
