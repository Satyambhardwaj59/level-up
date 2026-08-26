import {
  getUsers,
  setUsers
} from "../data/users.js";


// GET /api/users
export function getAllUsers(req, res) {
  const users = getUsers();

  const search = req.query.search;

  let result = users;

  if (search) {
    result = users.filter((user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
}


// GET /api/users/:id
export function getUserById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID"
    });
  }

  const users = getUsers();

  const user = users.find(
    (user) => user.id === id
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
}


// POST /api/users
export function createUser(req, res) {
  const {
    name,
    email,
    age
  } = req.body;

  if (!name || !email || age === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name, email and age are required"
    });
  }

  const users = getUsers();

  const existingUser = users.find(
    (user) => user.email === email
  );

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email already exists"
    });
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

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser
  });
}


// PUT /api/users/:id
export function updateUser(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID"
    });
  }

  const users = getUsers();

  const index = users.findIndex(
    (user) => user.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const updatedUser = {
    ...users[index],
    ...req.body,
    id
  };

  users[index] = updatedUser;

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUser
  });
}


// DELETE /api/users/:id
export function deleteUser(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID"
    });
  }

  const users = getUsers();

  const exists = users.some(
    (user) => user.id === id
  );

  if (!exists) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const updatedUsers = users.filter(
    (user) => user.id !== id
  );

  setUsers(updatedUsers);

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
}