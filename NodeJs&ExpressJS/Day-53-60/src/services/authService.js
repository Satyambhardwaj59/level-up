const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

/**
 * Sign a JWT token for a user
 * @param {string} id - User's MongoDB _id
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * Register a new user
 * @param {{ name: string, email: string, password: string }} data
 * @returns {{ user: object, token: string }}
 */
const registerUser = async ({ name, email, password }) => {
  // Check for duplicate email
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'An account with this email already exists.');
  }

  // Create user — password is hashed by the pre-save hook in User model
  const user = await User.create({ name, email, password });

  const token = signToken(user._id);

  // toJSON transform removes password and __v
  return { user: user.toJSON(), token };
};

/**
 * Login with email and password
 * @param {{ email: string, password: string }} credentials
 * @returns {{ user: object, token: string }}
 */
const loginUser = async ({ email, password }) => {
  // Explicitly select password (it's select: false on the schema)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    // Generic message to prevent email enumeration
    throw new ApiError(401, 'Invalid email or password.');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const token = signToken(user._id);

  // Build safe user object without password
  const safeUser = user.toJSON();

  return { user: safeUser, token };
};

module.exports = { registerUser, loginUser };
