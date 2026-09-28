-- Reset test inventory

UPDATE inventory
SET quantity = 5
WHERE product_id = 1;


-- ==========================================
-- SUCCESSFUL CHECKOUT
-- ==========================================

BEGIN;

SELECT *
FROM inventory
WHERE product_id = 1
FOR UPDATE;

UPDATE inventory
SET quantity = quantity - 2
WHERE product_id = 1
  AND quantity >= 2
RETURNING *;

ROLLBACK;


-- ==========================================
-- FAILED CHECKOUT
-- ==========================================

BEGIN;

UPDATE inventory
SET quantity = quantity - 1000
WHERE product_id = 1
  AND quantity >= 1000;

-- Expected: 0 rows

ROLLBACK;


-- ==========================================
-- TRANSACTION ROLLBACK
-- ==========================================

BEGIN;

UPDATE inventory
SET quantity = quantity - 1
WHERE product_id = 1;

INSERT INTO orders (
    user_id,
    status,
    total_amount
)
VALUES (
    1,
    'confirmed',
    999
);

ROLLBACK;


SELECT *
FROM inventory
WHERE product_id = 1;