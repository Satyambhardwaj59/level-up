import { pool } from "../config/database.js";


export async function createCheckout({
  userId,
  productId,
  quantity
}) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // ======================================
    // 1. Lock inventory
    // ======================================

    const inventoryResult = await client.query(
      `
        SELECT
          product_id,
          quantity
        FROM inventory
        WHERE product_id = $1
        FOR UPDATE
      `,
      [productId]
    );

    if (inventoryResult.rowCount === 0) {
      throw new Error("Inventory record not found");
    }

    const stock = inventoryResult.rows[0].quantity;


    // ======================================
    // 2. Check stock
    // ======================================

    if (stock < quantity) {
      throw new Error(
        `Insufficient stock. Available: ${stock}`
      );
    }


    // ======================================
    // 3. Get product
    // ======================================

    const productResult = await client.query(
      `
        SELECT
          id,
          price,
          is_active
        FROM products
        WHERE id = $1
      `,
      [productId]
    );

    if (productResult.rowCount === 0) {
      throw new Error("Product not found");
    }

    const product = productResult.rows[0];

    if (!product.is_active) {
      throw new Error("Product is inactive");
    }


    // ======================================
    // 4. Calculate total
    // ======================================

    const total =
      Number(product.price) * quantity;


    // ======================================
    // 5. Create order
    // ======================================

    const orderResult = await client.query(
      `
        INSERT INTO orders (
          user_id,
          status,
          total_amount
        )
        VALUES ($1, 'confirmed', $2)
        RETURNING *
      `,
      [userId, total]
    );

    const order = orderResult.rows[0];


    // ======================================
    // 6. Create order item
    // ======================================

    await client.query(
      `
        INSERT INTO order_items (
          order_id,
          product_id,
          quantity,
          price
        )
        VALUES ($1, $2, $3, $4)
      `,
      [
        order.id,
        productId,
        quantity,
        product.price
      ]
    );


    // ======================================
    // 7. Decrease inventory
    // ======================================

    const inventoryUpdate =
      await client.query(
        `
          UPDATE inventory
          SET
            quantity = quantity - $1
          WHERE product_id = $2
            AND quantity >= $1
          RETURNING *
        `,
        [quantity, productId]
      );

    if (inventoryUpdate.rowCount !== 1) {
      throw new Error(
        "Inventory update failed"
      );
    }


    // ======================================
    // 8. Create payment
    // ======================================

    const paymentResult = await client.query(
      `
        INSERT INTO payments (
          order_id,
          amount,
          status
        )
        VALUES ($1, $2, 'success')
        RETURNING *
      `,
      [order.id, total]
    );


    // ======================================
    // 9. Commit
    // ======================================

    await client.query("COMMIT");

    return {
      order,
      payment: paymentResult.rows[0],
      remainingStock:
        inventoryUpdate.rows[0].quantity
    };

  } catch (error) {

    await client.query("ROLLBACK");

    throw error;

  } finally {

    client.release();
  }
}


export async function findOrderById(id) {
  const result = await pool.query(
    `
      SELECT
        o.id,
        o.user_id,
        o.status,
        o.total_amount,
        o.created_at,

        COALESCE(
          jsonb_agg(
            jsonb_build_object(
              'product_id', oi.product_id,
              'quantity', oi.quantity,
              'price', oi.price
            )
          ) FILTER (
            WHERE oi.id IS NOT NULL
          ),
          '[]'::jsonb
        ) AS items

      FROM orders o

      LEFT JOIN order_items oi
        ON oi.order_id = o.id

      WHERE o.id = $1

      GROUP BY o.id
    `,
    [id]
  );

  return result.rows[0];
}