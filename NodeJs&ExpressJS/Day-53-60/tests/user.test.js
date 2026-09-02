/**
 * User (Admin) Tests
 *
 * Covers:
 *  - Admin: GET /users, DELETE /users/:id
 *  - User: forbidden on all /users routes (403)
 *  - Admin deletes user → tasks cascade deleted
 *  - Admin cannot delete themselves (400)
 *  - 404 on deleting non-existent user
 */
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app');
const { startDB, stopDB, clearDB } = require('./testDb');
const User = require('../src/models/User');
const Task = require('../src/models/Task');

let adminToken, adminId;
let userToken, userId;

const registerAndLogin = async (name, email, password = 'Password123') => {
  const res = await request(app)
    .post('/api/v1/auth/register')
    .send({ name, email, password });
  return { token: res.body.data.token, id: res.body.data.user._id };
};

beforeAll(startDB);

beforeEach(async () => {
  await clearDB();

  // Create regular user
  const u = await registerAndLogin('Regular User', 'user@example.com');
  userToken = u.token;
  userId = u.id;

  // Create admin directly (role can't be set via register endpoint)
  const adminUser = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'Password123',
    role: 'admin',
  });
  adminId = adminUser._id.toString();

  // Login as admin
  const loginRes = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@example.com', password: 'Password123' });
  adminToken = loginRes.body.data.token;
});

afterAll(stopDB);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/users
// ─────────────────────────────────────────────────────────────────────────────
describe('GET /api/v1/users', () => {
  it('✅ Admin can get all users', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.users).toBeDefined();
    expect(res.body.data.users.length).toBeGreaterThanOrEqual(2);
    res.body.data.users.forEach((u) => {
      expect(u.password).toBeUndefined();
    });
  });

  it('❌ Regular user cannot access /users (403)', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('❌ Unauthenticated request returns 401', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/v1/users/:id
// ─────────────────────────────────────────────────────────────────────────────
describe('DELETE /api/v1/users/:id', () => {
  it('✅ Admin can delete a user and their tasks cascade', async () => {
    await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'Task to be cascade deleted' });

    const res = await request(app)
      .delete(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    const deletedUser = await User.findById(userId);
    expect(deletedUser).toBeNull();

    const tasks = await Task.find({ user: userId });
    expect(tasks).toHaveLength(0);
  });

  it('❌ Admin cannot delete themselves (400)', async () => {
    const res = await request(app)
      .delete(`/api/v1/users/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(400);
  });

  it('❌ Regular user cannot delete users (403)', async () => {
    const res = await request(app)
      .delete(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(403);
  });

  it('❌ Returns 404 for non-existent user', async () => {
    const res = await request(app)
      .delete('/api/v1/users/64b2f0f3e1234567890abcde')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(404);
  });

  it('❌ Returns 400 for invalid user ID format', async () => {
    const res = await request(app)
      .delete('/api/v1/users/not-valid-id')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(400);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Admin tasks visibility
// ─────────────────────────────────────────────────────────────────────────────
describe('Admin can view all tasks', () => {
  it('✅ Admin sees tasks from all users', async () => {
    await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'User task visible to admin' });

    const res = await request(app)
      .get('/api/v1/tasks')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.meta.total).toBeGreaterThanOrEqual(1);
    const titles = res.body.data.map((t) => t.title);
    expect(titles).toContain('User task visible to admin');
  });
});
