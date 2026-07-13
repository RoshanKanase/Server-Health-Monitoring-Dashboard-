import React, { useState, useEffect } from 'react';
import useMetrics from '../../hooks/useMetrics';

const Navbar = () => {
  const { connected, status } = useMetrics();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const formatDate = (d) =>
    d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Server Health Monitor</span>
      </div>
      <div className="navbar-right">
        <span className="navbar-time">{formatDate(time)} &nbsp;|&nbsp; {formatTime(time)}</span>
        <div
          className="status-badge"
          style={{ marginLeft: '8px' }}
          data-status={connected ? (status || 'online') : 'offline'}
        >
          <span
            className={`status-badge ${connected ? 'online' : 'offline'}`}
          >
            <span className="status-badge-dot" />
            {connected ? 'Live' : 'Disconnected'}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
