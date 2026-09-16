import React, { useState, useEffect } from 'react';
import './OfflineNotification.css';

const OfflineNotification: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="offline-notification">
      <div className="offline-content">
        <span className="offline-icon">⚠️</span>
        <p>You are currently offline. Some features may be unavailable until your connection is restored.</p>
      </div>
    </div>
  );
};

export default OfflineNotification;
