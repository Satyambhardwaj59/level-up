/**
 * Task Tests
 *
 * Covers:
 *  - Create, Read (list + single), Update, Delete
 *  - Ownership enforcement (user A cannot modify user B's tasks)
 *  - Filtering (status, priority)
 *  - Pagination (page, limit, totalPages)
 *  - Search (text search)
 *  - Error codes: 400, 401, 403, 404
 */
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app');
const { startDB, stopDB, clearDB } = require('./testDb');
const User = require('../src/models/User');
const Task = require('../src/models/Task');

let userAToken, userBToken;
let userAId, userBId;

const registerAndLogin = async (name, email, password = 'Password123') => {
  const res = await request(app)
    .post('/api/v1/auth/register')
    .send({ name, email, password });
  return { token: res.body.data.token, userId: res.body.data.user._id };
};

beforeAll(startDB);

beforeEach(async () => {
  await clearDB();
  const a = await registerAndLogin('User A', 'usera@example.com');
  userAToken = a.token;
  userAId = a.userId;
  const b = await registerAndLogin('User B', 'userb@example.com');
  userBToken = b.token;
  userBId = b.userId;
});

afterAll(stopDB);

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/tasks
// ─────────────────────────────────────────────────────────────────────────────
describe('POST /api/v1/tasks', () => {
  it('✅ should create a task for authenticated user', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ title: 'Build REST API', priority: 'high' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.task.title).toBe('Build REST API');
    expect(res.body.data.task.status).toBe('todo');
    expect(res.body.data.task.priority).toBe('high');
    expect(res.body.data.task.user).toBe(userAId);
  });

  it('❌ should return 401 without token', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .send({ title: 'No auth task' });
    expect(res.statusCode).toBe(401);
  });

  it('❌ should return 400 for missing title', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ description: 'No title here' });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('❌ should return 400 for invalid status', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ title: 'Bad status task', status: 'invalid-status' });
    expect(res.statusCode).toBe(400);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/tasks
// ─────────────────────────────────────────────────────────────────────────────
describe('GET /api/v1/tasks', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ title: 'Backend API', status: 'completed', priority: 'high' });
    await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ title: 'Frontend UI', status: 'in-progress', priority: 'medium' });
    await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ title: 'Write tests', status: 'todo', priority: 'low' });
    await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userBToken}`)
      .send({ title: 'User B task', status: 'todo', priority: 'medium' });
  });

  it('✅ should return only User A tasks', async () => {
    const res = await request(app)
      .get('/api/v1/tasks')
      .set('Authorization', `Bearer ${userAToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(3);
    expect(res.body.meta.total).toBe(3);
  });

  it('✅ should filter by status=completed', async () => {
    const res = await request(app)
      .get('/api/v1/tasks?status=completed')
      .set('Authorization', `Bearer ${userAToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe('Backend API');
  });

  it('✅ should filter by priority=high', async () => {
    const res = await request(app)
      .get('/api/v1/tasks?priority=high')
      .set('Authorization', `Bearer ${userAToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.every((t) => t.priority === 'high')).toBe(true);
  });

  it('✅ should paginate correctly', async () => {
    const res = await request(app)
      .get('/api/v1/tasks?page=1&limit=2')
      .set('Authorization', `Bearer ${userAToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.meta.page).toBe(1);
    expect(res.body.meta.limit).toBe(2);
    expect(res.body.meta.total).toBe(3);
    expect(res.body.meta.totalPages).toBe(2);
  });

  it('✅ should search by title text', async () => {
    const res = await request(app)
      .get('/api/v1/tasks?search=Backend')
      .set('Authorization', `Bearer ${userAToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].title).toContain('Backend');
  });

  it('❌ should return 401 without token', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(res.statusCode).toBe(401);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/tasks/:id
// ─────────────────────────────────────────────────────────────────────────────
describe('GET /api/v1/tasks/:id', () => {
  let taskId;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ title: 'My specific task' });
    taskId = res.body.data.task._id;
  });

  it('✅ should get task by id for owner', async () => {
    const res = await request(app)
      .get(`/api/v1/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userAToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.task._id).toBe(taskId);
  });

  it('❌ should return 403 when User B tries to access User A task', async () => {
    const res = await request(app)
      .get(`/api/v1/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userBToken}`);
    expect(res.statusCode).toBe(403);
  });

  it('❌ should return 404 for non-existent task', async () => {
    const res = await request(app)
      .get('/api/v1/tasks/64b2f0f3e1234567890abcde')
      .set('Authorization', `Bearer ${userAToken}`);
    expect(res.statusCode).toBe(404);
  });

  it('❌ should return 400 for invalid task ID format', async () => {
    const res = await request(app)
      .get('/api/v1/tasks/not-a-valid-id')
      .set('Authorization', `Bearer ${userAToken}`);
    expect(res.statusCode).toBe(400);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/v1/tasks/:id
// ─────────────────────────────────────────────────────────────────────────────
describe('PUT /api/v1/tasks/:id', () => {
  let taskId;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ title: 'Task to update', status: 'todo' });
    taskId = res.body.data.task._id;
  });

  it('✅ should update own task', async () => {
    const res = await request(app)
      .put(`/api/v1/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ status: 'completed', priority: 'high' });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.task.status).toBe('completed');
    expect(res.body.data.task.priority).toBe('high');
  });

  it('❌ User A cannot update User B task (403)', async () => {
    const bRes = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userBToken}`)
      .send({ title: 'User B exclusive task' });
    const bTaskId = bRes.body.data.task._id;

    const res = await request(app)
      .put(`/api/v1/tasks/${bTaskId}`)
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ status: 'completed' });
    expect(res.statusCode).toBe(403);
  });

  it('❌ should return 404 for non-existent task', async () => {
    const res = await request(app)
      .put('/api/v1/tasks/64b2f0f3e1234567890abcde')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ status: 'completed' });
    expect(res.statusCode).toBe(404);
  });

  it('❌ should return 400 for invalid status value', async () => {
    const res = await request(app)
      .put(`/api/v1/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ status: 'done' });
    expect(res.statusCode).toBe(400);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/v1/tasks/:id
// ─────────────────────────────────────────────────────────────────────────────
describe('DELETE /api/v1/tasks/:id', () => {
  let taskId;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ title: 'Task to delete' });
    taskId = res.body.data.task._id;
  });

  it('✅ should delete own task', async () => {
    const res = await request(app)
      .delete(`/api/v1/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userAToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    const getRes = await request(app)
      .get(`/api/v1/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userAToken}`);
    expect(getRes.statusCode).toBe(404);
  });

  it('❌ User B cannot delete User A task (403)', async () => {
    const res = await request(app)
      .delete(`/api/v1/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userBToken}`);
    expect(res.statusCode).toBe(403);
  });

  it('❌ should return 404 for already-deleted task', async () => {
    await request(app)
      .delete(`/api/v1/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userAToken}`);

    const res = await request(app)
      .delete(`/api/v1/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userAToken}`);
    expect(res.statusCode).toBe(404);
  });
});
