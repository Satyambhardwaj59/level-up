import * as userService from "../services/userService.js";

import {
  successResponse,
  errorResponse
} from "../utils/response.js";

/*
|--------------------------------------------------------------------------
| GET /api/users
|--------------------------------------------------------------------------
*/

export const getUsers = (req, res) => {
  try {
    const users = userService.getUsers({
      name: req.query.name,
      limit: req.query.limit
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Users fetched successfully",
      data: {
        count: users.length,
        users
      },
      requestId: req.requestId
    });
  } catch (error) {
    return handleControllerError(error, req, res);
  }
};

/*
|--------------------------------------------------------------------------
| GET /api/users/:id
|--------------------------------------------------------------------------
*/

export const getUserById = (req, res) => {
  try {
    const user = userService.getUserById(
      req.params.id
    );

    return successResponse(res, {
      statusCode: 200,
      message: "User fetched successfully",
      data: user,
      requestId: req.requestId
    });
  } catch (error) {
    return handleControllerError(error, req, res);
  }
};

/*
|--------------------------------------------------------------------------
| POST /api/users
|--------------------------------------------------------------------------
*/

export const createUser = (req, res) => {
  try {
    const user = userService.createUser(req.body);

    return successResponse(res, {
      statusCode: 201,
      message: "User created successfully",
      data: user,
      requestId: req.requestId
    });
  } catch (error) {
    return handleControllerError(error, req, res);
  }
};

/*
|--------------------------------------------------------------------------
| PATCH /api/users/:id
|--------------------------------------------------------------------------
*/

export const updateUser = (req, res) => {
  try {
    const user = userService.updateUser(
      req.params.id,
      req.body
    );

    return successResponse(res, {
      statusCode: 200,
      message: "User updated successfully",
      data: user,
      requestId: req.requestId
    });
  } catch (error) {
    return handleControllerError(error, req, res);
  }
};

/*
|--------------------------------------------------------------------------
| DELETE /api/users/:id
|--------------------------------------------------------------------------
*/

export const deleteUser = (req, res) => {
  try {
    userService.deleteUser(req.params.id);

    res.setHeader(
      "X-Request-ID",
      req.requestId
    );

    return res.status(204).send();
  } catch (error) {
    return handleControllerError(error, req, res);
  }
};

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

const handleControllerError = (
  error,
  req,
  res
) => {
  console.error("Controller Error:", error);

  return errorResponse(res, {
    statusCode: error.statusCode || 500,
    code:
      error.code ||
      "INTERNAL_SERVER_ERROR",
    message:
      error.message ||
      "Internal server error",
    requestId: req.requestId
  });
};