// Adversitement.tsx
import React, { useState, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import './Adversitement.scss';
import Button from '../../common/Button/Button';
import Wheel from './SpinWheel';  // Import Wheel component
import DarkModePrompt from './DarkModePrompt';  // Import Dark Mode Prompt

const Adversitement: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [showDarkModePrompt, setShowDarkModePrompt] = useState(false);

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowDarkModePrompt(true);  // Show dark mode prompt after popup closes
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
              <DarkModePrompt onClose={closePopup}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Adversitement;
