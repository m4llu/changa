// DarkModePrompt.tsx
import React from 'react';
import Button from '../../common/Button/Button';
import './Adversitement.scss';

interface DarkModePromptProps {
  onClose: () => void;
}

const DarkModePrompt: React.FC<DarkModePromptProps> = ({ onClose }) => {
  // Function to set the meta tag for prefers-color-scheme
  const setColorSchemeMetaTag = (scheme: 'dark' | 'light') => {
    let metaTag = document.querySelector('meta[name="prefers-color-scheme"]');
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'color-scheme');
      document.head.appendChild(metaTag);
    }
    
    metaTag.setAttribute('content', scheme);
  };

  const enableDarkMode = () => {
    setColorSchemeMetaTag('dark');  // Set meta tag to dark
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');

    // Store the user's preference in localStorage
    localStorage.setItem('theme', 'dark');

    onClose();
  };

  const disableDarkMode = () => {
    setColorSchemeMetaTag('light');  // Set meta tag to light
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');

    // Store the user's preference in localStorage
    localStorage.setItem('theme', 'light');

    onClose();
  };

  return (
    <div className="dark-mode-prompt">
      <h2>Do you want to turn dark mode on?</h2>
      <div className="buttons">
        <Button variant='tertiary' onClick={enableDarkMode}>
          Yes
        </Button>
        <Button variant='tertiary' onClick={disableDarkMode}>
          No
        </Button>
      </div>
    </div>
  );
};

export default DarkModePrompt;
