import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useIframeBridge() {
  const location = useLocation();
  const navigate = useNavigate();
  let lastHeight = 0;
  let resizeTimeout;

  useEffect(() => {
    // Inform host about current route
    window.parent.postMessage({ type: 'ROUTE_CHANGE', href: location.pathname }, '*');

    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newHeight = document.documentElement.scrollHeight;
        if (Math.abs(newHeight - lastHeight) > 5) {
          lastHeight = newHeight;
          window.parent.postMessage({ type: 'SET_HEIGHT', height: newHeight }, '*');
          console.log('[iframe] sending height:', newHeight);
        }
      }, 100);
    };

    // Initial resize
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(document.body);

    const handleRouteUpdate = (e) => {
      if (e.data?.type === 'WP_ROUTE_UPDATE') {
        navigate(e.data.href);
      }
    };

    window.addEventListener('message', handleRouteUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener('message', handleRouteUpdate);
      clearTimeout(resizeTimeout);
    };
  }, [location]);
}