import React from 'react';
import { getSeverityColor } from '../../utils/formatters';

/**
 * Reusable metric card with a progress bar.
 * Props:
 *  label       - card title
 *  value       - primary numeric value (string or number)
 *  unit        - unit string (e.g. "%", "GB")
 *  sub         - secondary info line
 *  icon        - emoji or react-icon
 *  percent     - 0-100 fill for the progress bar (optional)
 *  accentColor - CSS gradient for the top border & icon bg
 *  delay       - animation delay in ms
 */
const MetricCard = ({
  label,
  value,
  unit = '',
  sub,
  icon,
  percent,
  accentColor,
  iconBg,
  iconColor,
  delay = 0,
}) => {
  const severity = percent !== undefined ? getSeverityColor(percent) : 'healthy';

  return (
    <div
      className="metric-card"
      style={{
        '--card-accent': accentColor,
        '--card-icon-bg': iconBg,
        '--card-icon-color': iconColor,
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="metric-card-header">
        <span className="metric-card-label">{label}</span>
        {icon && <div className="metric-card-icon">{icon}</div>}
      </div>

      <div className="metric-card-value">
        {value ?? '—'}
        {unit && <span className="metric-card-unit">{unit}</span>}
      </div>

      {sub && <div className="metric-card-sub">{sub}</div>}

      {percent !== undefined && (
        <div className="progress-bar-wrapper">
          <div className="progress-bar-track">
            <div
              className={`progress-bar-fill ${severity}`}
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
