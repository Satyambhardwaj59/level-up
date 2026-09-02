const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');

/**
 * Create a new task
 * @param {object} data  - Validated task fields
 * @param {string} userId - Authenticated user's ID
 */
const createTask = async (data, userId) => {
  const task = await Task.create({ ...data, user: userId });
  return task;
};

/**
 * Get tasks with filtering, search, sorting, and pagination
 *
 * @param {object} queryParams - req.query
 * @param {string} userId      - Authenticated user's ID
 * @param {string} role        - User role ('user' | 'admin')
 */
const getTasks = async (queryParams, userId, role) => {
  const {
    page = 1,
    limit = 10,
    status,
    priority,
    search,
    sort = 'createdAt',
    order = 'desc',
  } = queryParams;

  // ── Build filter ────────────────────────────────────────────────────────────
  const filter = {};

  // Regular users only see their own tasks; admins see all
  if (role !== 'admin') {
    filter.user = userId;
  }

  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  // Text search on title and description
  if (search) {
    filter.$text = { $search: search };
  }

  // ── Pagination ──────────────────────────────────────────────────────────────
  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  // ── Sort ────────────────────────────────────────────────────────────────────
  const allowedSortFields = ['createdAt', 'updatedAt', 'dueDate', 'priority', 'status', 'title'];
  const sortField = allowedSortFields.includes(sort) ? sort : 'createdAt';
  const sortOrder = order === 'asc' ? 1 : -1;
  const sortObj = { [sortField]: sortOrder };

  // ── Query ───────────────────────────────────────────────────────────────────
  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean(), // lean() for performance on read-only queries
    Task.countDocuments(filter),
  ]);

  return {
    tasks,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

/**
 * Get a single task by ID (with ownership check)
 */
const getTaskById = async (taskId, userId, role) => {
  const task = await Task.findById(taskId).lean();

  if (!task) {
    throw new ApiError(404, 'Task not found.');
  }

  // Users can only access their own tasks
  if (role !== 'admin' && task.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'Access denied. You can only access your own tasks.');
  }

  return task;
};

/**
 * Update a task (with ownership check)
 */
const updateTask = async (taskId, data, userId, role) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, 'Task not found.');
  }

  if (role !== 'admin' && task.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'Access denied. You can only update your own tasks.');
  }

  // Apply updates
  Object.assign(task, data);
  await task.save();

  return task;
};

/**
 * Delete a task (with ownership check)
 */
const deleteTask = async (taskId, userId, role) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, 'Task not found.');
  }

  if (role !== 'admin' && task.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'Access denied. You can only delete your own tasks.');
  }

  await Task.findByIdAndDelete(taskId);

  return { message: 'Task deleted successfully.' };
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
