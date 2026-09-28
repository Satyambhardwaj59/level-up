import {
  findAllUsers,
  findUserById,
  createUser
} from "../repositories/userRepository.js";

export async function getUsers() {
  return findAllUsers();
}

export async function getUser(id) {
  const user = await findUserById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
}

export async function registerUser(data) {
  return createUser(
    data.name,
    data.email
  );
}