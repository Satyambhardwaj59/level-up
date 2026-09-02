/**
 * Shared test database helper using mongodb-memory-server.
 * Provides startDB / stopDB / clearDB utilities for test suites.
 *
 * Usage in a test file:
 *
 *   const { startDB, stopDB, clearDB } = require('./testDb');
 *   beforeAll(startDB);
 *   afterEach(clearDB);   // optional — wipe between tests
 *   afterAll(stopDB);
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const startDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGO_URI = uri;
  await mongoose.connect(uri);
};

const stopDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

module.exports = { startDB, stopDB, clearDB };
