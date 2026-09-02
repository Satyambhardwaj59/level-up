const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');

// All task routes require authentication
router.use(protect);

// POST /api/v1/tasks
router.post('/', validate(createTaskSchema), taskController.createTask);

// GET /api/v1/tasks
// ?page, ?limit, ?status, ?priority, ?search, ?sort, ?order
router.get('/', taskController.getTasks);

// GET /api/v1/tasks/:id
router.get('/:id', taskController.getTaskById);

// PUT /api/v1/tasks/:id
router.put('/:id', validate(updateTaskSchema), taskController.updateTask);

// DELETE /api/v1/tasks/:id
router.delete('/:id', taskController.deleteTask);

module.exports = router;
