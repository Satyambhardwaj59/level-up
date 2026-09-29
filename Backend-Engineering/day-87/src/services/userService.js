import * as userRepository from "../repositories/userRepository.js";

/*
|--------------------------------------------------------------------------
| Email Validation
|--------------------------------------------------------------------------
*/

const isValidEmail = (email) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

/*
|--------------------------------------------------------------------------
| Get Users
|--------------------------------------------------------------------------
*/

export const getUsers = ({ name, limit }) => {
  let parsedLimit;

  if (limit !== undefined) {
    parsedLimit = Number(limit);

    if (
      !Number.isInteger(parsedLimit) ||
      parsedLimit <= 0
    ) {
      const error = new Error(
        "limit must be a positive integer"
      );

      error.statusCode = 400;
      error.code = "INVALID_LIMIT";

      throw error;
    }
  }

  return userRepository.findAll({
    name,
    limit: parsedLimit
  });
};

/*
|--------------------------------------------------------------------------
| Get User
|--------------------------------------------------------------------------
*/

export const getUserById = (id) => {
  const user = userRepository.findById(id);

  if (!user) {
    const error = new Error("User not found");

    error.statusCode = 404;
    error.code = "USER_NOT_FOUND";

    throw error;
  }

  return user;
};

/*
|--------------------------------------------------------------------------
| Create User
|--------------------------------------------------------------------------
*/

export const createUser = (data) => {
  const { name, email, role } = data;

  if (!name || typeof name !== "string") {
    const error = new Error("Name is required");

    error.statusCode = 400;
    error.code = "NAME_REQUIRED";

    throw error;
  }

  if (!email || typeof email !== "string") {
    const error = new Error("Email is required");

    error.statusCode = 400;
    error.code = "EMAIL_REQUIRED";

    throw error;
  }

  if (!isValidEmail(email)) {
    const error = new Error("Invalid email address");

    error.statusCode = 400;
    error.code = "INVALID_EMAIL";

    throw error;
  }

  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedName.length < 2) {
    const error = new Error(
      "Name must contain at least 2 characters"
    );

    error.statusCode = 400;
    error.code = "INVALID_NAME";

    throw error;
  }

  return userRepository.create({
    name: normalizedName,
    email: normalizedEmail,
    role: role || "user"
  });
};

/*
|--------------------------------------------------------------------------
| Update User
|--------------------------------------------------------------------------
*/

export const updateUser = (id, data) => {
  if (!data || typeof data !== "object") {
    const error = new Error("Request body must be an object");

    error.statusCode = 400;
    error.code = "INVALID_BODY";

    throw error;
  }

  if (
    data.email !== undefined &&
    !isValidEmail(data.email)
  ) {
    const error = new Error("Invalid email address");

    error.statusCode = 400;
    error.code = "INVALID_EMAIL";

    throw error;
  }

  if (
    data.name !== undefined &&
    (typeof data.name !== "string" ||
      data.name.trim().length < 2)
  ) {
    const error = new Error(
      "Name must contain at least 2 characters"
    );

    error.statusCode = 400;
    error.code = "INVALID_NAME";

    throw error;
  }

  const user = userRepository.update(id, {
    ...(data.name !== undefined && {
      name: data.name.trim()
    }),

    ...(data.email !== undefined && {
      email: data.email.trim().toLowerCase()
    }),

    ...(data.role !== undefined && {
      role: data.role
    })
  });

  if (!user) {
    const error = new Error("User not found");

    error.statusCode = 404;
    error.code = "USER_NOT_FOUND";

    throw error;
  }

  return user;
};

/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

export const deleteUser = (id) => {
  const deleted = userRepository.remove(id);

  if (!deleted) {
    const error = new Error("User not found");

    error.statusCode = 404;
    error.code = "USER_NOT_FOUND";

    throw error;
  }

  return true;
};