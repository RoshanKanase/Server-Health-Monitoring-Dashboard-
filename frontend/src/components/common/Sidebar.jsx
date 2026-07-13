import React from 'react';
import useMetrics from '../../hooks/useMetrics';

const navItems = [
  { icon: '📊', label: 'Dashboard',     section: 'main' },
  { icon: '🖥️', label: 'CPU',           section: 'metrics' },
  { icon: '💾', label: 'Memory',        section: 'metrics' },
  { icon: '💿', label: 'Disk',          section: 'metrics' },
  { icon: '🌐', label: 'Network',       section: 'metrics' },
  { icon: '⚙️', label: 'Services',      section: 'metrics' },
  { icon: '🌡️', label: 'Temperature',   section: 'metrics' },
];

const Sidebar = () => {
  const { connected, cpuModel } = useMetrics();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">⚡</div>
        <div className="sidebar-logo-text">
          ServerPulse
          <span>Health Monitor</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Navigation</div>
        {navItems.filter(i => i.section === 'main').map((item) => (
          <a key={item.label} href="#dashboard" className="sidebar-nav-item active">
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </a>
        ))}

        <div className="sidebar-section-label">Metrics</div>
        {navItems.filter(i => i.section === 'metrics').map((item) => (
          <a key={item.label} href={`#${item.label.toLowerCase()}`} className="sidebar-nav-item">
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="server-info">
          <div className={`server-info-dot ${connected ? 'online' : 'offline'}`} />
          <div className="server-info-text">
            <strong>{connected ? 'Connected' : 'Offline'}</strong>
            {cpuModel || 'Local Server'}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
