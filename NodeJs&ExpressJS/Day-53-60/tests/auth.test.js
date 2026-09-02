/**
 * Authentication Tests
 *
 * Covers:
 *  - Register: success, duplicate email, validation errors
 *  - Login: success, wrong password, missing fields
 *  - GET /me: with valid token, without token, with invalid token
 */
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app');
const { startDB, stopDB, clearDB } = require('./testDb');
const User = require('../src/models/User');

beforeAll(startDB);
beforeEach(clearDB);
afterAll(stopDB);

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/auth/register
// ─────────────────────────────────────────────────────────────────────────────
describe('POST /api/v1/auth/register', () => {
  const validUser = {
    name: 'Satyam',
    email: 'satyam@example.com',
    password: 'Password123',
  };

  it('✅ should register a new user and return token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(validUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.user).toHaveProperty('_id');
    expect(res.body.data.user.email).toBe(validUser.email);
    expect(res.body.data.user.role).toBe('user');
    // Password must never be returned
    expect(res.body.data.user.password).toBeUndefined();
  });

  it('❌ should return 409 for duplicate email', async () => {
    await request(app).post('/api/v1/auth/register').send(validUser);
    const res = await request(app).post('/api/v1/auth/register').send(validUser);

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('❌ should return 400 for missing name', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'test@example.com', password: 'Password123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it('❌ should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Test', email: 'not-an-email', password: 'Password123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('❌ should return 400 for weak password (no uppercase)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Test', email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('❌ should return 400 for weak password (no number)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Test', email: 'test@example.com', password: 'PasswordOnly' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/auth/login
// ─────────────────────────────────────────────────────────────────────────────
describe('POST /api/v1/auth/login', () => {
  const creds = { email: 'satyam@example.com', password: 'Password123' };

  beforeEach(async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Satyam', ...creds });
  });

  it('✅ should login and return token', async () => {
    const res = await request(app).post('/api/v1/auth/login').send(creds);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.user.password).toBeUndefined();
  });

  it('❌ should return 401 for wrong password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: creds.email, password: 'WrongPass999' });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('❌ should return 401 for non-existent email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nobody@example.com', password: 'Password123' });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('❌ should return 400 for missing password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: creds.email });

    expect(res.statusCode).toBe(400);
  });

  it('❌ should return 400 for missing email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ password: 'Password123' });

    expect(res.statusCode).toBe(400);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/auth/me
// ─────────────────────────────────────────────────────────────────────────────
describe('GET /api/v1/auth/me', () => {
  let token;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Satyam', email: 'satyam@example.com', password: 'Password123' });
    token = res.body.data.token;
  });

  it('✅ should return current user with valid token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user).toHaveProperty('_id');
    expect(res.body.data.user.password).toBeUndefined();
  });

  it('❌ should return 401 with no token', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('❌ should return 401 with invalid token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer this.is.invalid');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('❌ should return 401 with malformed Authorization header', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', 'NotBearer token');

    expect(res.statusCode).toBe(401);
  });
});
