const mongoose = require('mongoose');

const MetricSnapshotSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    cpu: {
      usage: { type: Number },          // percentage
      cores: { type: Number },
      speed: { type: Number },          // GHz
      model: { type: String },
    },
    memory: {
      total: { type: Number },           // bytes
      used: { type: Number },
      free: { type: Number },
      usagePercent: { type: Number },
    },
    disk: [
      {
        fs: { type: String },
        mount: { type: String },
        size: { type: Number },
        used: { type: Number },
        usagePercent: { type: Number },
      },
    ],
    network: {
      rx_bytes: { type: Number },
      tx_bytes: { type: Number },
      rx_sec: { type: Number },
      tx_sec: { type: Number },
      interface: { type: String },
    },
    uptime: { type: Number },            // seconds
    temperature: {
      main: { type: Number },
      cores: [{ type: Number }],
      max: { type: Number },
    },
    load: {
      avgLoad: { type: Number },
      currentLoad: { type: Number },
    },
    services: [
      {
        name: { type: String },
        running: { type: Boolean },
        pid: { type: Number },
      },
    ],
    status: {
      type: String,
      enum: ['online', 'offline', 'degraded'],
      default: 'online',
    },
  },
  {
    timestamps: false,
    collection: 'metric_snapshots',
  }
);

// Auto-remove snapshots older than 24 hours
MetricSnapshotSchema.index({ timestamp: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('MetricSnapshot', MetricSnapshotSchema);
