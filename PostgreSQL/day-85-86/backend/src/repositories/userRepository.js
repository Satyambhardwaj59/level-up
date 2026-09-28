import { query } from "../config/database.js";

export async function findAllUsers() {
  const result = await query(`
    SELECT
      id,
      name,
      email,
      created_at
    FROM users
    ORDER BY id DESC
    LIMIT 100
  `);

  return result.rows;
}


export async function findUserById(id) {
  const result = await query(
    `
      SELECT
        id,
        name,
        email,
        created_at
      FROM users
      WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}


export async function createUser(name, email) {
  const result = await query(
    `
      INSERT INTO users (
        name,
        email
      )
      VALUES ($1, $2)
      RETURNING *
    `,
    [name, email]
  );

  return result.rows[0];
}