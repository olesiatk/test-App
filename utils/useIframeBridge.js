import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useIframeBridge() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // повідомлення про зміну URL
    window.parent.postMessage({ type: 'ROUTE_CHANGE', href: location.pathname }, '*');

    // повідомлення про висоту
    const resize = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ type: 'SET_HEIGHT', height }, '*');
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);

    // слухає повідомлення від WordPress
    window.addEventListener('message', (e) => {
      if (e.data?.type === 'WP_ROUTE_UPDATE') {
        navigate(e.data.href);
      }
    });

    return () => observer.disconnect();
  }, [location]);
}
