import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];

    // Push the virtual pageview to GTM
    window.dataLayer.push({
      event: 'virtual_pageview',
      page_path: location.pathname + location.search,
      page_title: document.title
    });
  }, [location]);
};

export default usePageTracking;
