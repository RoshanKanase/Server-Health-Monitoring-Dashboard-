const { collectMetrics } = require('../services/systemMetrics');
const MetricSnapshot = require('../models/MetricSnapshot');
const logger = require('../utils/logger');

const EMIT_INTERVAL_MS = 2000; // broadcast every 2 seconds

/**
 * Initialise Socket.IO handlers and start the metrics broadcast loop.
 * @param {import('socket.io').Server} io
 */
const initMetricsSocket = (io) => {
  let intervalId = null;

  const broadcastMetrics = async () => {
    try {
      const metrics = await collectMetrics();

    // Persist snapshot to MongoDB (fire-and-forget, non-fatal)
      try {
        const mongoose = require('mongoose');
        if (mongoose.connection.readyState === 1) {
          MetricSnapshot.create(metrics).catch((err) =>
            logger.warn('Snapshot save failed:', err.message)
          );
        }
      } catch (_) { /* MongoDB offline – skip persistence */ }

      // Emit to all connected clients
      io.emit('metrics:update', metrics);
    } catch (error) {
      logger.error('Socket broadcast error:', error.message);
      io.emit('metrics:error', { message: 'Failed to collect metrics' });
    }
  };

  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    // Start broadcast loop only on first connection
    if (!intervalId) {
      intervalId = setInterval(broadcastMetrics, EMIT_INTERVAL_MS);
      logger.info('Metrics broadcast loop started');
    }

    // Send an immediate snapshot on connect
    broadcastMetrics();

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);

      // Stop loop when no clients remain
      if (io.engine.clientsCount === 0 && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        logger.info('Metrics broadcast loop stopped (no clients)');
      }
    });
  });
};

module.exports = { initMetricsSocket };
