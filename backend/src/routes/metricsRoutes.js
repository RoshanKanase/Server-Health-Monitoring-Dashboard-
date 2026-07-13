const express = require('express');
const router = express.Router();
const {
  getLiveMetrics,
  getHistoricalMetrics,
  getServerStatus,
} = require('../controllers/metricsController');

// @route   GET /api/metrics/live
// @desc    Get current system metrics snapshot
// @access  Public
router.get('/live', getLiveMetrics);

// @route   GET /api/metrics/history
// @desc    Get historical metrics from MongoDB
// @access  Public
router.get('/history', getHistoricalMetrics);

// @route   GET /api/metrics/status
// @desc    Quick server health check
// @access  Public
router.get('/status', getServerStatus);

module.exports = router;
