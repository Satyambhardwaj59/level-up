const userService = require('../services/userService');

/**
 * GET /api/v1/users
 * Admin only — returns all users (no passwords)
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      data: { users, count: users.length },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/v1/users/:id
 * Admin only — deletes user and all their tasks
 */
const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, deleteUser };
