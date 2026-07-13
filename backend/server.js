require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const connectDB = require('./src/config/db');
const metricsRoutes = require('./src/routes/metricsRoutes');
const { initMetricsSocket } = require('./src/sockets/metricsSocket');
const errorHandler = require('./src/middlewares/errorHandler');
const logger = require('./src/utils/logger');

// ── Bootstrap ────────────────────────────────────────────────────────────────
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 60000,
});

// ── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ── Global Middleware ────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, _res, next) => {
  logger.debug(`→ ${req.method} ${req.originalUrl}`);
  next();
});

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/metrics', metricsRoutes);

// Root health ping
app.get('/', (_req, res) => {
  res.json({ message: 'Server Health API is running 🚀', timestamp: new Date() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Error Handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

// ── Socket.IO ────────────────────────────────────────────────────────────────
initMetricsSocket(io);

// ── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT} [${process.env.NODE_ENV}]`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received — shutting down gracefully');
  httpServer.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

module.exports = { app, io };
