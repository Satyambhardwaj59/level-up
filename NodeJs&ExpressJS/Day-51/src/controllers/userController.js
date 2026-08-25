import {
  getUsers,
  setUsers
} from "../data/users.js";


// GET /api/users
export function getAllUsers(req, res) {
  const users = getUsers();

  // Query parameters
  const search = req.query.get("search");

  let result = users;

  if (search) {
    result = users.filter((user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(
    JSON.stringify({
      success: true,
      count: result.length,
      data: result
    })
  );
}


// GET /api/users/:id
export function getUserById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return sendError(
      res,
      400,
      "Invalid user ID"
    );
  }

  const users = getUsers();

  const user = users.find(
    (user) => user.id === id
  );

  if (!user) {
    return sendError(
      res,
      404,
      "User not found"
    );
  }

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(
    JSON.stringify({
      success: true,
      data: user
    })
  );
}


// POST /api/users
export function createUser(req, res, body) {
  const {
    name,
    email,
    age
  } = body;

  if (!name || !email || age === undefined) {
    return sendError(
      res,
      400,
      "Name, email and age are required"
    );
  }

  const users = getUsers();

  const emailExists = users.some(
    (user) => user.email === email
  );

  if (emailExists) {
    return sendError(
      res,
      409,
      "Email already exists"
    );
  }

  const newUser = {
    id:
      users.length > 0
        ? Math.max(
            ...users.map((user) => user.id)
          ) + 1
        : 1,
    name,
    email,
    age
  };

  users.push(newUser);

  res.writeHead(201, {
    "Content-Type": "application/json"
  });

  res.end(
    JSON.stringify({
      success: true,
      message: "User created successfully",
      data: newUser
    })
  );
}


// PUT /api/users/:id
export function updateUser(req, res, body) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return sendError(
      res,
      400,
      "Invalid user ID"
    );
  }

  const users = getUsers();

  const index = users.findIndex(
    (user) => user.id === id
  );

  if (index === -1) {
    return sendError(
      res,
      404,
      "User not found"
    );
  }

  const updatedUser = {
    ...users[index],
    ...body,
    id
  };

  users[index] = updatedUser;

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(
    JSON.stringify({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    })
  );
}


// DELETE /api/users/:id
export function deleteUser(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return sendError(
      res,
      400,
      "Invalid user ID"
    );
  }

  const users = getUsers();

  const userExists = users.some(
    (user) => user.id === id
  );

  if (!userExists) {
    return sendError(
      res,
      404,
      "User not found"
    );
  }

  const updatedUsers = users.filter(
    (user) => user.id !== id
  );

  setUsers(updatedUsers);

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(
    JSON.stringify({
      success: true,
      message: "User deleted successfully"
    })
  );
}


// Error helper
function sendError(
  res,
  statusCode,
  message
) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json"
  });

  res.end(
    JSON.stringify({
      success: false,
      message
    })
  );
}