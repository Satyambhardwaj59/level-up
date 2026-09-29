import { randomUUID } from "crypto";

const users = [
  {
    id: randomUUID(),
    name: "Satyam",
    email: "satyam@example.com",
    role: "developer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    name: "Rahul",
    email: "rahul@example.com",
    role: "designer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

/*
|--------------------------------------------------------------------------
| Find All
|--------------------------------------------------------------------------
*/

export const findAll = ({ name, limit } = {}) => {
  let result = [...users];

  if (name) {
    const searchTerm = name.toLowerCase();

    result = result.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
  }

  if (limit) {
    result = result.slice(0, limit);
  }

  return result;
};

/*
|--------------------------------------------------------------------------
| Find By ID
|--------------------------------------------------------------------------
*/

export const findById = (id) => {
  return users.find((user) => user.id === id) || null;
};

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

export const create = ({ name, email, role = "user" }) => {
  const now = new Date().toISOString();

  const user = {
    id: randomUUID(),
    name,
    email,
    role,
    createdAt: now,
    updatedAt: now
  };

  users.push(user);

  return user;
};

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export const update = (id, data) => {
  const user = users.find((item) => item.id === id);

  if (!user) {
    return null;
  }

  if (data.name !== undefined) {
    user.name = data.name;
  }

  if (data.email !== undefined) {
    user.email = data.email;
  }

  if (data.role !== undefined) {
    user.role = data.role;
  }

  user.updatedAt = new Date().toISOString();

  return user;
};

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

export const remove = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);

  return true;
};