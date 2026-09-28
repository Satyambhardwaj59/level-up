import { query } from "../config/database.js";


export async function findProducts({
  categoryId,
  active = true,
  limit = 20,
  offset = 0
}) {
  const params = [];

  const conditions = [];

  if (active !== undefined) {
    params.push(active);
    conditions.push(
      `p.is_active = $${params.length}`
    );
  }

  if (categoryId) {
    params.push(categoryId);

    conditions.push(
      `p.category_id = $${params.length}`
    );
  }

  params.push(limit);

  const limitParam = `$${params.length}`;

  params.push(offset);

  const offsetParam = `$${params.length}`;

  const result = await query(
    `
      SELECT
        p.id,
        p.name,
        p.sku,
        p.price,
        p.tags,
        p.regions,
        p.metadata,
        p.is_active,
        i.quantity AS stock
      FROM products p
      LEFT JOIN inventory i
        ON i.product_id = p.id
      WHERE ${conditions.join(" AND ")}
      ORDER BY p.id DESC
      LIMIT ${limitParam}
      OFFSET ${offsetParam}
    `,
    params
  );

  return result.rows;
}


export async function findProductById(id) {
  const result = await query(
    `
      SELECT
        p.*,
        i.quantity AS stock,
        get_stock_status(i.quantity) AS stock_status
      FROM products p
      LEFT JOIN inventory i
        ON i.product_id = p.id
      WHERE p.id = $1
    `,
    [id]
  );

  return result.rows[0];
}


export async function searchByMetadata(metadata) {
  const result = await query(
    `
      SELECT
        p.*,
        i.quantity AS stock
      FROM products p
      LEFT JOIN inventory i
        ON i.product_id = p.id
      WHERE p.metadata @> $1::jsonb
      ORDER BY p.id DESC
      LIMIT 100
    `,
    [JSON.stringify(metadata)]
  );

  return result.rows;
}