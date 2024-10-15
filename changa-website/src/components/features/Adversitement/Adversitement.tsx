// Adversitement.tsx
import React, { useState, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import './Adversitement.scss';
import Button from '../../common/Button/Button';
import Wheel from './SpinWheel';  // Import Wheel component


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

  return (
    <>
      {isPopupVisible && (
        <div className="adversitement-container">
          <div className="popup">
            <div className="popup-content">
              <Wheel/>
              <Button variant="tertiary" fullWidth={true} onClick={closePopup}>
                Close
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Adversitement;
