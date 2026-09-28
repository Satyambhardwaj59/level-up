-- ==========================================
-- MANUAL CHECKOUT TRANSACTION
-- ==========================================

BEGIN;

-- Lock product inventory
SELECT
    product_id,
    quantity
FROM inventory
WHERE product_id = 1
FOR UPDATE;


-- Check product
SELECT
    id,
    price
FROM products
WHERE id = 1
  AND is_active = TRUE;


-- Create order
INSERT INTO orders (
    user_id,
    status,
    total_amount
)
VALUES (
    1,
    'confirmed',
    2000
)
RETURNING id;


-- Example:
-- Suppose returned order_id = 50001


INSERT INTO order_items (
    order_id,
    product_id,
    quantity,
    price
)
SELECT
    50001,
    id,
    2,
    price
FROM products
WHERE id = 1;


-- Atomic stock reduction

UPDATE inventory
SET
    quantity = quantity - 2
WHERE product_id = 1
  AND quantity >= 2;


-- Payment

INSERT INTO payments (
    order_id,
    amount,
    status
)
VALUES (
    50001,
    2000,
    'success'
);


COMMIT;