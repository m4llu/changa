import { useEffect } from 'react';

const useStickyNav = () => {
  useEffect(() => {
    const handleScroll = () => {
      const stickyNav = document.querySelector('.sticky-nav');
      const banner = document.querySelector('.banner');

      if (window.pageYOffset > 50) {
        stickyNav?.classList.add('shrink');
        banner?.classList.add('low');
      } else {
        stickyNav?.classList.remove('shrink');
        banner?.classList.remove('low');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export default useStickyNav;
