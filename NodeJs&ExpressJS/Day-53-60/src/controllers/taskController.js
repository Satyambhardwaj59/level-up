const taskService = require('../services/taskService');

/**
 * POST /api/v1/tasks
 */
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user._id);

    res.status(201).json({
      success: true,
      message: 'Task created successfully.',
      data: { task },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/v1/tasks
 * Supports: ?page, ?limit, ?status, ?priority, ?search, ?sort, ?order
 */
const getTasks = async (req, res, next) => {
  try {
    const { tasks, meta } = await taskService.getTasks(
      req.query,
      req.user._id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      data: tasks,
      meta,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/v1/tasks/:id
 */
const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(
      req.params.id,
      req.user._id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/v1/tasks/:id
 */
const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user._id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      message: 'Task updated successfully.',
      data: { task },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/v1/tasks/:id
 */
const deleteTask = async (req, res, next) => {
  try {
    const result = await taskService.deleteTask(
      req.params.id,
      req.user._id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
