/**
 * formatters.js — Utility functions for formatting metric values
 */

/**
 * Convert bytes to a human-readable string (KB, MB, GB, TB)
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Convert bytes/sec to Mbps
 */
export const formatBandwidth = (bytesPerSec) => {
  if (!bytesPerSec || bytesPerSec === 0) return '0 Kbps';
  const kbps = (bytesPerSec * 8) / 1024;
  if (kbps < 1024) return `${kbps.toFixed(1)} Kbps`;
  return `${(kbps / 1024).toFixed(2)} Mbps`;
};

/**
 * Format uptime seconds into Dd HH:MM:SS
 */
export const formatUptime = (seconds) => {
  if (!seconds) return '0s';
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
};

/**
 * Return a severity color class based on a percentage value
 */
export const getSeverityColor = (percent) => {
  if (percent >= 90) return 'critical';
  if (percent >= 75) return 'warning';
  if (percent >= 50) return 'moderate';
  return 'healthy';
};

/**
 * Round a number to a fixed decimal
 */
export const toFixed = (num, decimals = 1) =>
  num !== null && num !== undefined ? Number(num).toFixed(decimals) : '—';

/**
 * Format temperature with unit
 */
export const formatTemp = (celsius) => {
  if (celsius === null || celsius === undefined) return 'N/A';
  return `${celsius.toFixed(1)}°C`;
};
