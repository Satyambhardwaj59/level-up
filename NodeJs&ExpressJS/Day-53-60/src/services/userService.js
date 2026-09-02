const User = require('../models/User');
const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');

/**
 * Get all users (admin only)
 * Uses .lean() since we don't need Mongoose document methods
 */
const getAllUsers = async () => {
  const users = await User.find().select('-password').lean();
  return users;
};

/**
 * Delete a user by ID along with all their tasks
 * @param {string} userId - Target user's _id
 * @param {string} requestingUserId - ID of the admin making the request
 */
const deleteUser = async (userId, requestingUserId) => {
  // Prevent admin from deleting themselves
  if (userId === requestingUserId.toString()) {
    throw new ApiError(400, 'You cannot delete your own account via this endpoint.');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found.');
  }

  // Delete all tasks belonging to this user
  await Task.deleteMany({ user: userId });

  // Delete the user
  await User.findByIdAndDelete(userId);

  return { message: 'User and all associated tasks deleted successfully.' };
};

module.exports = { getAllUsers, deleteUser };
