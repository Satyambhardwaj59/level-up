const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// All user routes require authentication + admin role
router.use(protect, authorize('admin'));

// GET /api/v1/users
router.get('/', userController.getAllUsers);

// DELETE /api/v1/users/:id
router.delete('/:id', userController.deleteUser);

module.exports = router;
