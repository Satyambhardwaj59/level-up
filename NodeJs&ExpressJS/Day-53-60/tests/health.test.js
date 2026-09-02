/**
 * Health Check Tests
 */
process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../src/app');
const { startDB, stopDB } = require('./testDb');

beforeAll(startDB);
afterAll(stopDB);

describe('GET /health', () => {
  it('should return 200 with status ok and database connected', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.database).toBe('connected');
    expect(typeof res.body.uptime).toBe('number');
    expect(res.body.uptime).toBeGreaterThanOrEqual(0);
  });
});
