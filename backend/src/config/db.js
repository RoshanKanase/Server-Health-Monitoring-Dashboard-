const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error but don't crash — metrics still work without DB
    logger.warn(`MongoDB unavailable: ${error.message}. Continuing without persistence.`);
  }
};

module.exports = connectDB;
