import {
  getUsers,
  getUser,
  registerUser
} from "../services/userService.js";

export async function listUsers(req, res) {
  const users = await getUsers();

  res.json({
    success: true,
    data: users
  });
}

export async function getUserById(req, res) {
  const user = await getUser(req.params.id);

  res.json({
    success: true,
    data: user
  });
}

export async function createUser(req, res) {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
}