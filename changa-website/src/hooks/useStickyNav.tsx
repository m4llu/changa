import { useEffect } from 'react';

const useStickyNav = (alwaysShrink: boolean = false) => {
  useEffect(() => {
    const stickyNav = document.querySelector<HTMLElement>('.sticky-nav');
    const banner = document.querySelector<HTMLElement>('.banner');

    if (!stickyNav) return;

    if (alwaysShrink) {
      stickyNav.classList.add('shrink');
      banner?.classList.add('low');
    }

    const handleScroll = () => {
      const isScrolled = window.pageYOffset > 1;
      const shouldShrink = alwaysShrink || isScrolled;

      if (shouldShrink) {
        if (!stickyNav.classList.contains('shrink')) {
          stickyNav.classList.add('shrink');
          banner?.classList.add('low');
        }
      } else {
        if (stickyNav.classList.contains('shrink')) {
          stickyNav.classList.remove('shrink');
          banner?.classList.remove('low');
        }
      }
    };

    const throttle = (func: () => void, limit: number) => {
      let lastFunc: ReturnType<typeof setTimeout> | null = null;
      let lastRan: number | undefined = undefined;
    
      return function(this: unknown, ...args: []) {
        if (!lastRan) {
          func.apply(this, args);
          lastRan = Date.now();
        } else {
          if (lastFunc) clearTimeout(lastFunc);
          lastFunc = setTimeout(() => {
            if (Date.now() - lastRan! >= limit) {
              func.apply(this, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan!));
        }
      };
    };

    const throttledHandleScroll = throttle(handleScroll, 10);

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [alwaysShrink]);
};

export default useStickyNav;
