const { collectMetrics } = require('../services/systemMetrics');
const MetricSnapshot = require('../models/MetricSnapshot');
const logger = require('../utils/logger');

/**
 * GET /api/metrics/live
 * Returns the current snapshot of system metrics (no DB write).
 */
const getLiveMetrics = async (req, res, next) => {
  try {
    const metrics = await collectMetrics();
    res.status(200).json({ success: true, data: metrics });
  } catch (error) {
    logger.error('getLiveMetrics error:', error);
    next(error);
  }
};

/**
 * GET /api/metrics/history?limit=60
 * Returns historical snapshots stored in MongoDB.
 */
const getHistoricalMetrics = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 60;
    const snapshots = await MetricSnapshot.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
    res.status(200).json({ success: true, count: snapshots.length, data: snapshots.reverse() });
  } catch (error) {
    logger.error('getHistoricalMetrics error:', error);
    next(error);
  }
};

/**
 * GET /api/metrics/status
 * Quick health check endpoint.
 */
const getServerStatus = async (req, res) => {
  res.status(200).json({
    success: true,
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};

module.exports = { getLiveMetrics, getHistoricalMetrics, getServerStatus };
