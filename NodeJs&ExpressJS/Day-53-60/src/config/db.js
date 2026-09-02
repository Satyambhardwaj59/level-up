const mongoose = require('mongoose');

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not defined in environment variables');

  const conn = await mongoose.connect(uri);
  console.log(`✅ MongoDB connected: ${conn.connection.host}`);
};

/**
 * Disconnect from MongoDB (used in tests and graceful shutdown)
 */
const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB disconnected');
};

module.exports = { connectDB, disconnectDB };
