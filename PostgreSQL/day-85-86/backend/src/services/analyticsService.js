import { query } from "../config/database.js";


export async function getDashboard() {
  const [
    revenue,
    customers,
    products,
    orders
  ] = await Promise.all([

    query(`
      SELECT
        COUNT(*) AS orders,
        COALESCE(SUM(total_amount), 0)
          AS revenue
      FROM orders
      WHERE status <> 'cancelled'
    `),

    query(`
      SELECT
        COUNT(*) AS customers
      FROM users
    `),

    query(`
      SELECT
        COUNT(*) AS products
      FROM products
      WHERE is_active = TRUE
    `),

    query(`
      SELECT
        status,
        COUNT(*) AS count
      FROM orders
      GROUP BY status
      ORDER BY status
    `)
  ]);

  return {
    revenue: revenue.rows[0],
    customers: customers.rows[0],
    products: products.rows[0],
    ordersByStatus: orders.rows
  };
}


export async function getTopProducts() {
  const result = await query(`
    SELECT
      p.id,
      p.name,
      SUM(oi.quantity) AS units_sold,
      SUM(oi.quantity * oi.price)
        AS revenue
    FROM products p
    JOIN order_items oi
      ON oi.product_id = p.id
    JOIN orders o
      ON o.id = oi.order_id
    WHERE o.status <> 'cancelled'
    GROUP BY p.id
    ORDER BY revenue DESC
    LIMIT 20
  `);

  return result.rows;
}