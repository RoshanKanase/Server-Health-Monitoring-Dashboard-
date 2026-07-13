import React from 'react';

const StatusBadge = ({ status = 'online' }) => {
  const labels = { online: 'Online', offline: 'Offline', degraded: 'Degraded' };

  return (
    <span className={`status-badge ${status}`}>
      <span className="status-badge-dot" />
      {labels[status] || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
